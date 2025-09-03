import { db } from "../config/connection.js"

export const createShowtime = async ({ roomId, movieId, datetime }) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO showtimes (id_room, id_movie, date_time) VALUES
                                            (?, ?, ?)`,
      [roomId, movieId, datetime]
    )
    if (result.affectedRows === 0) {
      return { success: false, message: "Error al crear la funcion" }
    }
    return {
      success: true,
      message: "Funcion creada correctamente",
      showtimeId: result.insertId,
    }
  } catch (e) {
    console.log(e)
    if (e.code === "ER_NO_REFERENCED_ROW_2" || e.errno === 1452) {
      return { success: false, message: "No existe la sala o pelicula" }
    }
    return { success: false, message: "Error de servidor" }
  }
}

export const getAllShowtimes = async () => {
  try {
    const [rows] = await db.execute(`
            SELECT
                s.id AS showtime_id,
                s.id_room,
                s.id_movie,
                s.date_time,
                m.name AS movie_name,
                m.slug AS movie_slug,
                m.description AS movie_description,
                m.duration AS movie_duration,
                m.clasification AS movie_clasification,
                m.poster AS movie_poster,
                r.name AS room_name,
                r.capacity AS room_capacity
            FROM showtimes s
            INNER JOIN movies m ON s.id_movie = m.id
            INNER JOIN rooms r ON s.id_room = r.id
        `)
    
    return rows
  } catch (e) {
    console.log(e)
    return { success: false, message: "Error de servidor" }
  }
}

export const getShowtime = async (id) => {
  try {
    const [rows] = await db.execute(
        `SELECT
            s.id AS showtime_id,
            s.id_room,
            s.id_movie,
            s.date_time,
            m.name AS movie_name,
            m.description AS movie_description,
            m.duration AS movie_duration,
            m.clasification AS movie_clasification,
            m.poster AS movie_poster,
            r.name AS room_name,
            r.capacity AS room_capacity
        FROM showtimes s
        INNER JOIN movies m ON s.id_movie = m.id
        INNER JOIN rooms r ON s.id_room = r.id
        WHERE s.id = ?
        `,[id]
    )
    console.log(rows)
    return rows
  } catch (e) {
    console.log(e)
    return { success: false, message: "Error de servidor" }
  }
}
