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
        );

        if (rows[0].ocupado > 0) {
            await connection.rollback()
            return { success: false, message: "El asiento ya esta reservado" }
        }

        // Crear reservacion
        const [reservation] = await connection.execute(
            `INSERT INTO reservations (id_showtime, id_user, date_reservation) 
             VALUES (?, ?, CURDATE())`, 
            [id_showtime, id_user]
        );

        if (reservation.affectedRows === 0) {
            await connection.rollback()
            return { success: false, message: "Fallo al crear la reservacion. Intenta de nuevo" }
        }

        // Guardar asiento reservado
        await connection.execute(
            `INSERT INTO reserved_seats (id_seat, id_room, id_reservation) VALUES (?, ?, ?)`, 
            [id_seat, id_room, reservation.insertId]
        );

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
};
