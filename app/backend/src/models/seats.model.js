import { db } from "../config/connection.js"

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

export const createSeats = async ({room_id, row_id, n_seats})=>{
    try {
        const rows = Array.from({ length: n_seats }, (_, i) => [
            room_id,
            row_id,
            i + 1
        ])
        const placeholders = rows.map(() => "(?, ?, ?)").join(", ")
        const values = rows.flat()
        const sql = `INSERT INTO seats (id_room, row_id, number_seat) VALUES ${placeholders}`

        await db.execute(sql, values)

        return { success: true, message: "Asientos creados correctamente" }
    } catch (error) {
        console.log(error)
        return { success: false, message: "Error al crear asientos" }
    }
}