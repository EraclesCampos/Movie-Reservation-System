import { db } from "../config/connection.js";

export const getRooms = async ()=>{
    try {
        const [rows] = await db.execute("SELECT  * FROM rooms")
        return rows
        
    } catch (err) {
        console.log(err)
        return {success: false, message: "Error de servidor"}
    }
}
export const createRoom = async ({name, capacity})=>{
    try {
        const [result] = await db.execute("INSERT INTO rooms (name, capacity) VALUES(?, ?)",[name,  capacity])
        if(result.affectedRows > 0) return {success: true, message: "Sala creada exitosamente", idRoomInserted: result.insertId}
        else return {success: false, message: "Error al crear la sala"}
    } catch (err) {
        console.log(err)
        return {success: false, message: "Error de servidor"}
    }
}