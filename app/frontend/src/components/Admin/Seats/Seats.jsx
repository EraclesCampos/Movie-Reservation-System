import { useState } from "react"
import { getRooms } from "../../../Utils/Rooms/Rooms"
import { useSeats } from "../../../Utils/Seats/Seats"

export const Seats = ()=>{
    const [roomId, setRoomId] = useState('')
    const [roomIdForm, setRoomIdForm] = useState('')
    const [rowId, setRowId] = useState('')
    const [numSeats, setNumSeats] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [errorSubmit, setErrorSubmit] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const {rooms} = getRooms()
    const {seats, reservedSeats} = useSeats(roomId)
    let idRows = []

    const handleChange = e=>{
        setRoomId(e.target.value)
    }

    const handleCloseModal = ()=>{
        setShowModal(false)
        setRoomIdForm('')
        setRoomId('')
        setNumSeats('')
        setRowId('')
        setErrorSubmit('')
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoadingSubmit(true)
        const token = localStorage.getItem("token")
        const formData = {
            room_id: roomIdForm, 
            row_id: rowId, 
            n_seats: numSeats
        }
        try {
            const result = await fetch(`http://localhost:3000/seats/create-seats`,
                {
                    headers:{"Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    method: "POST",
                    body: JSON.stringify(formData)
                }
            )
            const json = await result.json()
            console.log(json)
            if(!result.ok){
                throw new Error("Error al crear los asientos")
            }
            handleCloseModal()
        } catch (error) {
            setErrorSubmit(error.message)
        }finally{
            setLoadingSubmit(false)
        }
    }

    return(
        <div className="data-admin-panel">
            <div className="admin-header">
                <h2>Admin Seats</h2>
                <button className="btn-add" onClick={e=>setShowModal(true)}>
                    + Add Seats
                </button>
            </div>
            {rooms?.length > 0 ?
            <select name="roomId" id="select-room" value={roomId} onChange={handleChange}>
                <option value="" disabled>-- Selecciona una sala --</option>
                {
                    rooms.length > 0 &&
                    rooms.map((room, index)=>(
                        <option key={index} value={room.id}>Sala: {room.name}</option>
                    ))
                }
            </select>
            : <p>No hay salas aun</p>}
            {seats?.length > 0 ? 
            <div className="seats-container">
                {seats.map((seat, index)=>{
                    if(!idRows.includes(seat.row_id)){
                        idRows.push(seat.row_id)
                        return(
                            <div key={index} className="seat-row">
                                <span>{seat.row_id}</span>
                                <div className="row-seats">
                                    {seats.map((_seat, _index)=>{
                                        if(seat.row_id === _seat.row_id){
                                            return(
                                                <div key={_index} className="seat">
                                                    {_seat.number_seat}
                                                </div>
                                            ) 
                                        }
                                        return null
                                    })}
                                </div>
                            </div>
                        )
                    }
                    return null
                })}
            </div>
            : <p>Esta sala aun no tiene asientos</p>}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add new seats</h3>
                        {errorSubmit && <p>{errorSubmit}</p>}
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={rowId} placeholder="Id de la fila" onChange={e=>{setRowId(e.target.value)}}/>
                            {rooms.length > 0 ?
                            <select name="roomId" id="select-room" value={roomIdForm} onChange={e=>setRoomIdForm(e.target.value)}>
                                <option value="" disabled>-- Selecciona una sala --</option>
                                {
                                    rooms.length > 0 &&
                                    rooms.map((room, index)=>(
                                        <option key={index} value={room.id}>Sala: {room.name}</option>
                                    ))
                                }
                            </select>
                            : <p>No hay salas aun</p>}
                            <input type="number" name="num_seats" value={numSeats} placeholder="No. asientos fila" onChange={e=>setNumSeats(e.target.value)}/>
                            
                            <button type="button" className="btn-cancel" onClick={handleCloseModal}>Cancelar</button>
                            <button type="submit" className="btn-submit" disabled={loadingSubmit}>{loadingSubmit ? "Guardando..." : "Guardar"}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}