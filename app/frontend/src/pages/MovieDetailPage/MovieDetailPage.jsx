import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader/loader"
const MovieDetailPage = ()=>{
    const {slug, id} = useParams()
    const [movie, setMovie] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const fetchData = async ()=>{
            setLoading(true)
            try{
                const response = await fetch(`http://localhost:3000/movies/${slug}/${id}`)
                const data = await response.json()

                if(response.ok) setMovie(data)
                else setError(data.message) 
            }catch(err){
                console.log(err)
                setError("Error al obtener la informacion del servidor")
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
    
    if(loading){
        return(
            <div className="loader-container">
                <Loader />
            </div>
        )
    }
    return(
        <div className="movie-detail-container">
            <h1>Movie Detail</h1>
            {!error && movie && (
                <div>
                    <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} />
                    <h2>{movie.name}</h2>
                    <h3>Descripcion: </h3><p>{movie.description}</p>
                    <p>Clasificacion: <strong>{movie.clasification}</strong></p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    )
}
export default MovieDetailPage