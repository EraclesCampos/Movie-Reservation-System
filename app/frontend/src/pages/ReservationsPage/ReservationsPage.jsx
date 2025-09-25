import { useAuth } from "../../components/context/context"
import { useReservations } from "../../Utils/Reservations/Reservations"
import { FormatShowtime } from "../../Utils/Showtimes/FormatShowtime"
import { Link } from "react-router-dom"
import "./ReservationPage.css"
import Loader from "../../components/loader/loader"

const ReservationsPage = () => {
    const { user } = useAuth()
    const { reservaciones, groupedReservaciones, error, loading } = useReservations(user.id)
    console.log(groupedReservaciones)

    const handleDeleteReservation = async (reservationId) => {
        if (window.confirm("Estas seguro de que quieres cancelar esta reservacion?")) {
            try {
                console.log("Eliminar reservacion:", reservationId)
                alert("Reservacion cancelada exitosamente")
            } catch (error) {
                alert("Error al cancelar la reservacion")
            }
        }
    }

    if (loading) {
        return (
            <div className="loader-container">
                <Loader />
            </div>
        )
    }

    if (error) {
        return (
            <div className="reservations-container">
                <div className="error-message">Error: {error}</div>
            </div>
        )
    }

    return(
        <div className="reservations-container">
            <div className="reservations-header">
                <h1>Mis Reservaciones</h1>
                <p>Gestiona todas tus reservaciones de peliculas</p>
            </div>

            {reservaciones.length === 0 ? (
                <div className="empty-state">
                    <h3>No tienes reservaciones</h3>
                </div>
            ) : (
                <div className="reservations-grid">
                    {groupedReservaciones.map((reservacion, index) => (
                        <div key={index} className="reservation-card">
                            <div className="reservation-header">
                                <span className="reservation-id">
                                    Reservacion: #{reservacion.reservation_id}
                                </span>
                            </div>
                            
                            <div className="reservation-content">
                                <h3 className="movie-title">{reservacion.movie_name}</h3>
                                
                                <div className="reservation-details">
                                    <div className="detail">
                                        <span className="icon">📅</span>
                                        <span>{FormatShowtime(reservacion.showtime_date_time)}</span>
                                    </div>
                                    <div className="detail">
                                        <span className="icon">💺</span>
                                        <span>Asiento: {reservacion.seats.join(', ')}</span>
                                    </div>
                                    {reservacion.room_name && (
                                        <div className="detail">
                                            <span className="icon">🎬</span>
                                            <span>Sala: {reservacion.room_name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="reservation-actions">
                                <button 
                                    onClick={() => handleDeleteReservation(reservacion.reservation_id)}
                                    className="cancel-button"
                                >
                                    Cancelar Reservacion
                                </button>
                                <button className="details-button">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ReservationsPage