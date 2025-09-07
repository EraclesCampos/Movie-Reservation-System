import { getRooms } from "../../../Utils/Rooms/Rooms"
import { useState } from 'react'

export const Rooms = () => {
    const { rooms, error, loadRooms } = getRooms()
    const [showModal, setShowModal] = useState(false)
    const [deletingRoom, setDeletingRoom] = useState(null)
    const [formData, setFormData] = useState({
        name: "",
        capacity: ""
    })
    const [errorSubmit, setErrorSubmit] = useState(null)
    const [loadingSubmit, setLoadingSubmit]  = useState(false)

    // console.log(rooms)
    const handleSubmit= async (e)=>{
        e.preventDefault()
        console.log(formData)
        setLoadingSubmit(true)
        const token  = localStorage.getItem("token")
        try {
            const response = await fetch("http://localhost:3000/rooms/create-room",{
                headers: {"Authorization": `Bearer ${token}`, "Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify(formData)
            })
            const result = await response.json()
            if(!result.success){
                throw new Error(result.message)
            }
            handleCloseModal()
            loadRooms()
        } catch (error) {
            setErrorSubmit(error.message)
        }finally{
            setLoadingSubmit(false)
        }
    }
    const handleDelete = (roomId) => {
        // Aquí iría la lógica para eliminar el room
        setDeletingRoom(roomId)
        console.log('Eliminando room:', roomId)
        // Simulamos la eliminación con un timeout
        setTimeout(() => {
            setDeletingRoom(null)
            console.log('Room eliminado:', roomId)
        }, 1000)
    }
    const handleInputChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleCloseModal = ()=>{
        setShowModal(false)
        setFormData({
            name: "",
            capacity: ""
        })
    }
    return (
        <div className="data-admin-panel">
            <div className="admin-header">
                <h2>Admin Rooms</h2>
                <button className="btn-add" onClick={() => setShowModal(true)}>
                    + Add Room
                </button>
            </div>
            
            {error && <p className="error">{error}</p>}
            
            {rooms && rooms.length > 0 ? (
                <div className="rooms-table-container">
                    <table className="rooms-table">
                        <thead>
                            <tr>
                                <th>Room</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id} className="room-row">
                                    <td className="room-info">
                                        <div className="room-name">{room.name}</div>
                                        {room.capacity && (
                                            <div className="room-capacity">Capacity: {room.capacity}</div>
                                        )}
                                    </td>
                                    <td className="room-actions">
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(room.id)}
                                            disabled={deletingRoom === room.id}
                                        >
                                            {deletingRoom === room.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !error && <p>No hay salas</p>
            )}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add new room</h3>
                        {errorSubmit && <p>{errorSubmit}</p>}
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Nombre de la sala"
                                onChange={handleInputChange} 
                            />
                            <input 
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                placeholder="Capacidad"
                                onChange={handleInputChange} 
                            />
                            <div className="modal-buttons">
                                <button type="button" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="submit" disabled={loadingSubmit}>
                                    {loadingSubmit ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}