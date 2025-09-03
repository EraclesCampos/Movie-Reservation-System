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