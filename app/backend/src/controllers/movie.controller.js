import * as Movies from '../models/movie.model.js'
import { file } from '../middlewares/files.js'

export const getAllMovies = async (req, res)=>{
    try {
        const result = await Movies.getAllMovies()
        res.status(200).json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Error de servidor'})
    }
}
export const getMovie = async (req, res)=>{
    try {
        const id_movie = req.params.id
        const movie = await Movies.getMovie(id_movie)
        if(!movie) return res.status(404).json({message: 'Pelicula no encontrada'})
        res.json(movie)
    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}

export const createMovie = async (req, res)=>{
    const { name, description, duration, clasification } = req.body
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Debes enviar una imagen" });
    }
    const posterPath = `./public/posters/${req.file.filename}`
    
    if(!name || !description || !duration || !clasification || !posterPath){
        return res.status(400).json({success: false, message: "Faltan datos"})  
    } 
    try {
        const result = await Movies.addMovie({name, description, duration, clasification, poster: posterPath})

        if(result.success) return res.status(201).json({success: true, id: result.resultId})
        else return res.status(500).json({ success: false, message: "No se pudo agregar la película" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ success: false, message: "Error de servidor" })
    }
}