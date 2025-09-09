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
        return res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.status(500).json({success: false, message: "Error al obtener los asientos"})
    }
}

export const createSeats = async (req, res) =>{
    const {room_id, row_id, n_seats} = req.body
    if(!room_id || !row_id || !n_seats) return res.status(400).json({success: false, message: "Datos incompletos"})
    try{
        const result = await Seats.createSeats({room_id, row_id, n_seats})
        if(result.success) return res.status(200).json(result)
        else return res.status(500).json({success: result.success, message: result.message})
    }catch(e){
        console.log(e)
        res.status(500).json({success: false, message: "Error al crear los asientos"})
    }
}