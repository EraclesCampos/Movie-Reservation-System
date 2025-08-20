import { db } from "../config/connection.js";

export const createShowtime = async ({ roomId, movieId, datetime })=>{
    try{
        const [result] = await db.execute(`INSERT INTO showtimes (id_room, id_movie, date_time) VALUES
                                            (?, ?, ?)`,[roomId, movieId, datetime])
        if(result.affectedRows === 0) {
            return {success: false, message: "Error al crear la funcion"}
        }
        return {
            success: true, 
            message: "Funcion creada correctamente", 
            showtimeId: result.insertId
        }
    }catch(e){
        console.log(e)
        if (e.code === "ER_NO_REFERENCED_ROW_2" || e.errno === 1452) {
            return { success: false, message: "No existe la sala o pelicula" };
        }
        return {success: false, message: "Error de servidor"}
    }
}

export const getAllShowtimes = async ()=>{
    try{
        const [rows] = await db.execute("SELECT * FROM showtimes")
        console.log(rows)
        return rows
    }catch(e){
        console.log(e)
        return {success: false, message: "Error de servidor"}
    }
}