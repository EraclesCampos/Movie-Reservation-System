import { useState, useEffect } from "react"
import { getShowtimes } from "../../../Utils/Showtimes/Showtimes"
import Loader from "../../loader/loader"
import { getMovies } from "../../../Utils/Movies/Movies"
import {getRooms} from "../../../Utils/Rooms/Rooms"
import { FormatShowtime } from "../../../Utils/Showtimes/FormatShowtime"

export const Showtimes = ()=>{
    const [showModal, setShowModal] = useState(false)
    const {showtimes, error, loading, loadShowtimes } = getShowtimes()
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [loadingSubmit , setLoadingSubmit] = useState(false)
    const {movies} = getMovies()
    const [movieId, setMovieId] = useState("")
    const [roomId, setRoomId] = useState("")
    const [datetime, setDatetime] = useState("")
    const {rooms} = getRooms()

    const id_movies = []


    const handleSubmit = async (e)=>{
        e.preventDefault()
        // console.log("Movie: " + movieId + "Room: " + roomId + "Datetime: " + dateTime)
        setLoadingSubmit(true)

        const submitData = {movieId, roomId, datetime}

        const token = localStorage.getItem("token")
        try {
            const response = await fetch("http://localhost:3000/showtimes/create-showtime",
                {
                    headers: { 
                        "Content-Type": "application/json", 
                        "Authorization": `Bearer ${token}` 
                    },
                    method: "POST",
                    body: JSON.stringify(submitData) 
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
            loadShowtimes()
        } catch (err) {
            console.error(err)
            setErrorSubmit(err.message)
        }finally{
            setLoadingSubmit(false)
        }
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
        setMovieId("")
        setRoomId("")
        setDatetime("")
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
                <h2>Admin Showtimes</h2>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    + Add Showtime
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {showtimes.length > 0 ? (
                <ul className="showtimes-list">
                    {
                        showtimes.map((showtime, index)=>{
                            if(!id_movies.includes(showtime.id_movie)){
                                id_movies.push(showtime.id_movie)
                                return (
                                    <li className="showtime-item" key={index}>
                                        <div className="aside-showtime">
                                            <img src={`http://localhost:3000/${showtime.movie_poster}`} alt={showtime.movie_slug} />
                                        </div>
                                        <div className="showtime-data">
                                            <ul>
                                                {
                                                    showtimes.map((_showtime, _index)=>{
                                                        if(showtime.id_movie === _showtime.id_movie){
                                                            return (
                                                                <li key={_index} className="showtime-info">
                                                                    <p>Dia y fecha: {FormatShowtime(_showtime.date_time)}</p>
                                                                    <p>Sala: {_showtime.room_name}</p>
                                                                </li>
                                                            )
                                                        }
                                                        return null
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </li>
                                )
                            }
                            return null
                        })
                    }
                </ul>
                ) : (
                    !error && <p>No hay funciones disponibles</p>
                )
            }
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add new showtime</h3>
                        {errorSubmit && <p>{errorSubmit}</p>}
                        <form onSubmit={handleSubmit}>
                            <select name="movieId" id="select-movie" value={movieId} onChange={e=>setMovieId(e.target.value)}>
                                <option value="" disabled>-- Selecciona una pelicula --</option>
                                {
                                    movies.length > 0 &&
                                    movies.map((movie, index)=>(
                                        <option key={index} value={movie.id}>{movie.name}</option>
                                    ))
                                }
                            </select>
                            {rooms.length > 0 ?
                            <select name="roomId" id="select-room" value={roomId} onChange={e=>setRoomId(e.target.value)}>
                                <option value="" disabled>-- Selecciona una sala --</option>
                                {
                                    rooms.length > 0 &&
                                    rooms.map((room, index)=>(
                                        <option key={index} value={room.id}>Sala: {room.name}</option>
                                    ))
                                }
                            </select>
                            : <p>No hay salas aun</p>}
                            <input type="datetime-local" name="datetime" id="showtime-form-datetime" value={datetime} onChange={e=>setDatetime(e.target.value)}/>
                            
                            <button type="button" className="btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                            <button type="submit" className="btn-submit">{loadingSubmit ? "Guardando..." : "Guardar"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}