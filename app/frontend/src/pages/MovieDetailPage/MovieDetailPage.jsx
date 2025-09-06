import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../components/loader/loader"
import { getMovie } from "../../Utils/Movies/Movies"
const MovieDetailPage = ()=>{
    const {slug, id} = useParams()
    const {movie, error, loading} = getMovie({slug, id})
    
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