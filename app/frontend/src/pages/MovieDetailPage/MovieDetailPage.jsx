import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Loader from "../../components/loader/loader"
import { getMovie } from "../../Utils/Movies/Movies"
import "./MovieDetailPage.css"
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
        <div className="movie-detail-container" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%), url('http://localhost:3000/${movie ? movie.poster : ''}')`}}>
            {!error && movie && (
                <>
                    <div className="movie-detail-card">
                        <div className="movie-detail-poster">
                            <img src={`http://localhost:3000/${movie.poster}`} alt={movie.name} />
                        </div>
                        <div className="movie-detail-info">
                            <div>
                                <h2>{movie.name}</h2>
                                <span>{movie.duration} min</span>
                            </div>
                            <div className="movie-detail-actions">
                                <Link to={`/booking/${movie.slug}/${movie.id}`} className="button-detail-booking">Reservar</Link>
                            </div>
                        </div>
                    </div>
                    <div className="movie-detail-sinopsis">
                        <h3>Sinopsis</h3>
                        <p>{movie.description}</p>
                    </div>
                </>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}
export default MovieDetailPage