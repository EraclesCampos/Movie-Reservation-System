import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../../components/loader/loader"
import {getMovies} from "../../Utils/Movies/Movies.js"
const HomePage = ()=>{
    const navigate = useNavigate()
    const {movies, error, loading } = getMovies()
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
                    <div className="movie-card" onClick={()=>navigate(`/movie/${movie.slug}/${movie.id}`)} key={index}>
                        <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} />
                        <div>
                            <p>{movie.duration}</p>
                            <h3>{movie.name}</h3>
                            <Link to={`/movie/${movie.slug}/${movie.id}`}>Ver detalles</Link>
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