import { useParams } from "react-router-dom"
import { useState } from "react"
import { getMovie } from "../../Utils/Movies/Movies"
import { getShowtimes } from "../../Utils/Showtimes/Showtimes"
import Loader from "../../components/loader/loader"
import { FormatShowtime } from "../../Utils/Showtimes/FormatShowtime"
import { useSeats } from "../../Utils/Seats/Seats"

const BookingPage = ()=>{
    const {slug, id} = useParams()
    const {movie, error, loading} = getMovie({slug, id})
    const [showtime, setShowtime]= useState(null)
    const {showtimes} = getShowtimes()
    console.log(showtime)
    const {seats, reservedSeats, errorSeats, loadingSeats} = useSeats(showtime?.id_room)
    let idRows =  []
    
    const handleSelectShowtime = (showtime)=>{
        setShowtime(showtime)
    }
    if(loading){
        return(
            <div className="loader-container">
                <Loader />
            </div>
        )
    }
    return(
        <div className="booking-container">
            {movie && 
            <>
                <h1>Horarios</h1>
                <div className="booking-showtimes-conatiner">
                    {showtimes.length > 0 ? 
                        showtimes.map((showtime, index)=>{
                            if(showtime.id_movie === movie.id){
                                return (
                                    <div key={index}  style={{backgroundColor: "#ddd", width: "max-content", padding: "5px", marginBottom: "10px", cursor: "pointer"}} className="date-showtimes" onClick={e=>handleSelectShowtime(showtime)}>
                                        <p>{FormatShowtime(showtime.date_time)}</p>
                                    </div>
                                )
                            }
                            return null
                        })
                     : <p>Aun no hay funciones para esta pelicula</p>
                    }
                </div>
                {seats?.length > 0 ? 
                <div className="seats-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
                    <h2>Selecciona tus asientos</h2>
                    {seats.map((seat, index) => {
                        if (!idRows.includes(seat.row_id)) {
                            idRows.push(seat.row_id);
                            return (
                                <div 
                                    key={index} 
                                    className="seat-row" 
                                    style={{ display: 'flex', gap: '2%', width: '100%', marginBottom: '10px' }}
                                >
                                    <span style={{ flex: '0 0 8%', textAlign: 'center' }}>{seat.row_id}</span>
                                    <div 
                                        className="row-seats" 
                                        style={{ display: 'flex', gap: '2%', flex: '0 0 92%' }}
                                    >
                                        {seats.map((_seat, _index) => {
                                            if (seat.row_id === _seat.row_id) {
                                                return (
                                                    <div 
                                                        key={_index} 
                                                        className="seat" 
                                                        style={{ 
                                                            backgroundColor: 'white', 
                                                            border: '2px solid black', 
                                                            padding: '2px', 
                                                            flex: '1 0 auto', 
                                                            aspectRatio: '1/1', 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            justifyContent: 'center' 
                                                        }}
                                                    >
                                                        {_seat.number_seat}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                : showtime === null ? null :<p>Esta sala aun no tiene asientos</p>}

                <div className="booking-info">
                    <h3>Carrito</h3>
                    <div className="booking-info-movie" style={{display: "flex"}}>
                        <img style={{width: "80px"}} src={`http://localhost:3000/${movie.poster}`} alt="" />
                        <div>
                            <h4>{movie.name}</h4>
                            <p>Clasificacion: {movie.clasification}</p>
                            <p>Duracion: {movie.duration}</p>
                        </div>
                    </div>
                    <div className="booking-info-datetime" style={{display: "flex", gap: "20px"}}>
                        <div style={{display: "flex",flexDirection:"column"}}>
                            <label htmlFor="">Fecha y hora</label>
                            {!showtime ? <p>No se ha seleccionado fecha y hora</p>
                            : (
                                <time>{FormatShowtime(showtime.date_time)}</time>
                            )}
                        </div>
                        <div style={{display: "flex",flexDirection:"column"}}>
                            <label htmlFor="">Sala</label>
                            {!showtime ? null
                            : (
                                <p>{showtime.room_name}</p>
                            )}
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}
export default BookingPage