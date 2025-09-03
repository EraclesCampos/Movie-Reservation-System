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