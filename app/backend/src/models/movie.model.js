import { db } from '../database/connection.js'

export const getAllMovies = async ()=>{
    try {
        const [rows] = await db.execute('SELECT * FROM movies')
        return rows
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error de servidor'})
    }
}