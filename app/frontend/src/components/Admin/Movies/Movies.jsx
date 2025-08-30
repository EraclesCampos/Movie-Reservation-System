import { useEffect, useState } from "react"
import { getMovies } from "../../../Utils/Movies/Movies"
import Loader from "../../loader/loader"
export const Movies= ()=>{
    const {movies, error, loading } = getMovies()

    if(loading){
        return(
            <div className="loader-container">
                <Loader />
            </div>
        )
    }
    return(
        <div className="data-admin-panel">
            {error && <p className="error">{error}</p>}
            {movies.length > 0 ? (
                <div className="movies-grid">
                {
                movies.map((movie, index)=>(
                    <div className="movie-card" key={index}>
                        <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} />
                        <div>
                            <h3>{movie.name}</h3>
                            <div className="buttons-admin-movie">
                                <button>Editar</button>
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
        </div>
    )
}