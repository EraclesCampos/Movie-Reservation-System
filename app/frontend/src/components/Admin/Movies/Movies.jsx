import { useEffect, useState } from "react"
import { getMovies } from "../../../Utils/Movies/Movies"
import slugify from "react-slugify"
import Loader from "../../loader/loader"
export const Movies = ()=>{
    const [showModal, setShowModal] = useState({
        showed: false,
        idEdit: false
    })
    const [image, setImage] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        clasification: '',
        duration: 0,
    })    
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const {movies, error, loading, loadMovies } = getMovies()
    const [movieToEdit, setMovieToEdit] = useState(null)
    console.log(movieToEdit)
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file) setImage(file)
    }
    const handleInputChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleShowModal = (edit, movie)=>{
        if(edit){
            setShowModal({
                showed: true,
                isEdit: true
            })
            setMovieToEdit(movie)
            setFormData({
                id: movie.id,
                name: movie.name,
                slug: movie.slug,
                description: movie.description,
                clasification: movie.clasification,
                duration: movie.duration,
            })
        }
    }
    const handleCloseModal = ()=>{
        setShowModal({
            showed: false,
            isEdit: false
        })
        setFormData({
            id: '',
            name: '',
            slug: '',
            description: '',
            clasification: '',
            duration: '',
        })
        setImage(null)
        setErrorSubmit(null)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault() 
        setLoadingSubmit(true)

        const submitData = new FormData()
        const slugName = slugify(formData.name)

        submitData.append('id', formData.id)
        submitData.append('name', formData.name)
        submitData.append('slug', slugName)
        submitData.append('description', formData.description)
        submitData.append('clasification', formData.clasification)
        submitData.append('duration', formData.duration)
        if(image){
            submitData.append('poster', image)
        }
        else{
            submitData.append('existingImage', movieToEdit.poster)
        }
        const token = localStorage.getItem("token")
        try {
            const response = await fetch(`http://localhost:3000/movies/${showModal.isEdit ? "editMovie" : "createMovie"}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    method: "POST",
                    body: submitData 
                }
            )
            // if(!response.ok){
            //     throw new Error("Error al guardar la pelicula")
            // }
            const result = await response.json()
            console.log(result)
            if(!result.success){
                throw new Error(result.message)
            }
            handleCloseModal()
            loadMovies()
        } catch (err) {
            console.error(err)
            setErrorSubmit(err.message)
        }finally{
            setLoadingSubmit(false)
        }
    }
    if(loading){
        return(
            <div className="loader-container">
                <Loader />
            </div>
        )
    }
    return(
        <div className="data-admin-panel">
            <div className="admin-header">
                <h2>Admin Movies</h2>
                <button className="btn-add" onClick={() => setShowModal({showed: true, isEdit: false})}>
                    + Add Movie
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {movies.length > 0 ? (
                <div className="movies-grid">
                {
                movies.map((movie, index)=>(
                    <div className="movie-card" style={{width: '200px'}} key={index}>
                        <img src={`http://localhost:3000/${movie.poster}`} style={{width: '100%'}} alt={movie.name} />
                        <div>
                            <h3>{movie.name}</h3>
                            <div className="buttons-admin-movie">
                                <button onClick={()=>handleShowModal(true, movie)}>Editar</button>
                                <button>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))
                }
                </div>
            ) : (
                !error && <p>No hay peliculas disponibles</p>
            )

            }
            {showModal.showed && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add new movie</h3>
                        {errorSubmit && <p>{errorSubmit}</p>}
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Nombre de la pelicula"
                                onChange={handleInputChange} 
                            />
                            <textarea 
                                type="text"
                                name="description"
                                value={formData.description}
                                placeholder="Descripcion"
                                onChange={handleInputChange} 
                            />
                            <input 
                                type="text"
                                name="clasification"
                                value={formData.clasification}
                                placeholder="Clasificacion"
                                onChange={handleInputChange} 
                            />
                            <input 
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange} 
                            />
                            <div className="image-upload">
                                {movieToEdit && <input type="hidden" name="existingImage" value={movieToEdit.poster} />}

                                <input 
                                    type="file"
                                    name="poster"
                                    onChange={handleImageChange} 
                                    id="image-upload"
                                />
                                <label htmlFor="image-upload" className="upload-label">
                                    {image ? 'Cambiar imagen' : 'Seleccionar imagen'}
                                </label>
                            </div>
                            <div className="modal-buttons">
                                <button type="button" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="submit" disabled={loadingSubmit}>
                                    {loadingSubmit ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}