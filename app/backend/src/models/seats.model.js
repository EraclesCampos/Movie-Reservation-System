import { db } from "../config/connection.js";

export const getSeats = async (room_id)=>{
    try{
        const [rows] = await db.execute("SELECT * FROM seats WHERE id_room = ?", [room_id])
        return rows
    }catch(e){
        console.log(e)
        return {success: false, message: "Error de servidor"}
    }
}

export const getReservedSeats = async (room_id)=>{
    try{
        const [rows] = await db.execute("SELECT * FROM reserved_seats WHERE id_room = ?", [room_id])
        return rows
    }catch(e){
        console.log(e)
        return {success: false, message: "Error de servidor"}
    }
}