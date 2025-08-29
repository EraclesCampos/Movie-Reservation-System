import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../../components/loader/loader"
const HomePage = ()=>{
    const [movies, setMovies] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchData = async()=>{
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000/movies/", 
                    {
                        method: 'GET',
                    }
                )
                const json = await response.json()
                if(!response.ok){
                    setError(json.message)
                    return
                }
                // console.log(json)
                setMovies(json)            
            } catch (err) {
                console.log(err)
                setError("No se pudo conectar al servidor")
            }
            finally{
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    if(loading){
        return(
            <div className="loader-container">
                <Loader />
            </div>
        )
    }
    return(
        <div>
            <h1>Cartelera</h1>
            {error && <p className="error">{error}</p>}
            {movies.length > 0 ? (
                <div className="movies-grid">
                {
                movies.map((movie, index)=>(
                    <div className="movie-card" onClick={()=>navigate(`/movie/${movie.name}/${movie.id}`)} key={index}>
                        <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} />
                        <div>
                            <p>{movie.duration}</p>
                            <h3>{movie.name}</h3>
                            <Link to={`/movie/${movie.id}`}>Ver detalles</Link>
                        </div>
                    </div>
                ))
                }
                </div>
            ) : (
                !error && <p>No hay peliculas disponibles</p>
            )

            }
        </div>
    )
}
export default HomePage