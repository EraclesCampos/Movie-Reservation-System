import { db } from '../config/connection.js'

export const getAllMovies = async ()=>{
    try {
        const [rows] = await db.execute('SELECT * FROM movies')
        return rows
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error de servidor'})
    }
}
export const getMovie = async (id)=>{
    try {
        const [rows] = await db.execute('SELECT * FROM movies WHERE id = ?', [id])
        return rows[0] || null
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error de servidor'})
    }
}

export const addMovie = async ({name, description, duration, clasification, poster})=>{
    try {
        const [result] = await db.execute(`INSERT INTO movies (name, description, duration, clasification, poster) VALUES 
                                        (?, ?, ?, ?, ?)`, [name, description, duration, clasification, poster])
        console.log(result)
        return {
            success: result.affectedRows === 1,
            resultId: result.insertId
        }
    } catch (e) {
        console.log(e)
        return {message: 'Error de servidor'}
    }
}