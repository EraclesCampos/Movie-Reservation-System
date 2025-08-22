import * as Reservations from '../models/reservation.model.js'

export const createReservation = async (req, res)=>{
    const { id_showtime, id_user, id_seat, id_room } = req.body
    if(!id_showtime || !id_user || !id_seat || !id_room) return res.status(402).json({message: "Faltan datos"})
    try{    
        const result = await Reservations.createReservation({id_showtime, id_user, id_seat, id_room})
        if(result.success){
            res.status(201).json({success: result.success, message: result.message})
        }
        else{
            res.status(402).json({success: result.success, message: result.message})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({success: false, message: "Error de servidor"})
    }
}

export const getReservations = async (req, res)=>{
    const { id } = req.body
    if(!id) return res.status(403).json({message: "Envia una ip"})
    
    try{
        const reservations = await Reservations.getReservations({ id })
        if(reservations.success) return res.status(200).json(reservations)
        else return res.status(500).json({message: reservations.message})
    }catch(e){
        console.log(e)
        return res.status(500).json({message: "Error al obtener las reservaciones"})
    }
}