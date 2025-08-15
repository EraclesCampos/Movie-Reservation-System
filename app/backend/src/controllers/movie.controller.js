import * as Movies from '../models/movie.model.js'

export const getAllMovies = async (req, res)=>{
    try {
        const result = await Movies.getAllMovies()
        res.status(200).send(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error de servidor'})
    }
}