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