import * as Rooms from "../models/room.model.js"

export const getRooms = async (req, res)=>{
    try {
        const result = await Rooms.getRooms()
        return res.json(result)
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Error al obtener los datos"})
    }
}
export const createRoom = async (req, res)=>{
    const {name, capacity} = req.body
    if(!name || !capacity) return res.status(401).json({success: false, message: "Faltan datos"})
    try {
        const result = await Rooms.createRoom({name, capacity})
        if(result.success) return res.json({success: result.success, message: result.message, idRoomInserted: result.idRoomInserted})
        else return res.status(400).json({success: result.success, message: result.message})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: "Error al obtener los datos"})
    }
}