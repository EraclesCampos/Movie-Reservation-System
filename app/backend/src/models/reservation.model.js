import { db } from '../config/connection.js'

export const createReservation = async ({ id_showtime, id_user, id_seat, id_room }) => {
    let connection
    try {
        connection = await db.getConnection()
        await connection.beginTransaction()

        // Validar si el asiento ya esta reservado
        const [rows] = await connection.execute(
            `SELECT COUNT(*) AS ocupado FROM reserved_seats
             WHERE id_seat = ? AND id_room = ? FOR UPDATE`, 
            [id_seat, id_room]
        )

        if (rows[0].ocupado > 0) {
            await connection.rollback()
            return { success: false, message: "El asiento ya esta reservado" }
        }

        // Crear reservacion
        const [reservation] = await connection.execute(
            `INSERT INTO reservations (id_showtime, id_user, date_reservation) 
             VALUES (?, ?, CURDATE())`, 
            [id_showtime, id_user]
        )

        if (reservation.affectedRows === 0) {
            await connection.rollback()
            return { success: false, message: "Fallo al crear la reservacion. Intenta de nuevo" }
        }

        // Guardar asiento reservado
        await connection.execute(
            `INSERT INTO reserved_seats (id_seat, id_room, id_reservation) VALUES (?, ?, ?)`, 
            [id_seat, id_room, reservation.insertId]
        )

        await connection.commit()
        return { success: true, message: "Reservacion creada exitosamente" }
    } catch (e) {
        await connection.rollback()
        if(e.code === "ER_NO_REFERENCED_ROW_2" || e.errno === 1452){
            return { success: false, message: "No existe la funcion" }
        }
    } finally {
        connection.release()
    }
}

export const getReservations = async ({ id })=>{
    try {
        const [result] = await db.execute(
            `SELECT
                r.id AS reservation_id,
                r.date_reservation,
                s.id AS showtime_id,
                s.date_time AS showtime_date_time,
                m.id AS movie_id,
                m.name AS movie_name,
                m.description AS movie_description,
                m.duration AS movie_duration,
                m.clasification AS movie_clasification,
                m.poster AS movie_poster,
                rm.id AS room_id,
                rm.name AS room_name,
                rm.capacity AS room_capacity
            FROM reservations r
            INNER JOIN showtimes s ON r.id_showtime = s.id
            INNER JOIN movies m ON s.id_movie = m.id
            INNER JOIN rooms rm ON s.id_room = rm.id
            WHERE r.id_user = ?`, [id])
        return {success: true, result};
    } catch (e) {
        console.log(e)
        return {success: false, message: "Error al obtener las reservaciones"}
    }
}