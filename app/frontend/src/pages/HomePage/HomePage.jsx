import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "../../components/loader/loader"
import {getMovies} from "../../Utils/Movies/Movies.js"
import "./HomePage.css"
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
        <div className="home-page">
            <h1>Cartelera</h1>
            {error && <p className="error-message">{error}</p>}
            {movies.length > 0 ? (
                <div className="movies-grid">
                {
                movies.map((movie, index)=>(
                    <div className="movie-card" key={index}>
                        <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} onClick={()=>navigate(`/booking/${movie.slug}/${movie.id}`)} />
                        <div className="movie-info">
                            <div className="movie-meta">
                                <span>{movie.clasification}</span>
                                <p>{movie.duration} min</p>
                            </div>
                            <h3 className="movie-title">{movie.name}</h3>
                            <Link className="movie-link-details" onClick={e=>e.stopPropagation()} to={`/movie/${movie.slug}/${movie.id}`}>Ver detalles</Link>
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