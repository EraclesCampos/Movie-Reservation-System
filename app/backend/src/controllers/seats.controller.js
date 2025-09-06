import * as Seats from "../models/seats.model.js"

export const getSeats = async (req, res) =>{
    const {room_id} = req.query
    if(!room_id) return res.status(400).json({success: false,  message: "Debes enviar el id de la sala"})
    try{
        const result = await Seats.getSeats(room_id)
        console.log(result)
        return res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.status(500).json({success: false,  message: "Error al obtener los asientos"})
    }
}

export const getReservedSeats = async (req, res) =>{
    const {room_id} = req.query
    if(!room_id) return res.status(400).json({success: false, message: "Debes enviar el id de la sala"})
    try{
        const result = await Seats.getReservedSeats(room_id)
        console.log(result)
        return res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.status(500).json({success: false, message: "Error al obtener los asientos"})
    }
}