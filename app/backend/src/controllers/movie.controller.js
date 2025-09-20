import * as Movies from '../models/movie.model.js'

export const getAllMovies = async (req, res)=>{
    try {
        const result = await Movies.getAllMovies()
        return res.status(200).json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'Error de servidor'})
    }
}
export const getMovie = async (req, res)=>{
    const {slug, id} = req.params
    try {
        const movie = await Movies.getMovie({slug, id})
        if(!movie) return res.status(404).json({message: 'Pelicula no encontrada'})
        return res.json(movie)
    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: 'Error de servidor'})
    }
}

export const createMovie = async (req, res)=>{
    const { name, slug, description, duration, clasification } = req.body
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Debes enviar una imagen" })
    }
    const posterPath = `./public/posters/${req.file.filename}`

    if(!name || !description || !duration || !clasification || !posterPath){
        return res.status(400).json({success: false, message: "Faltan datos"})  
    } 
    try {
        const result = await Movies.addMovie({name, slug, description, duration, clasification, poster: posterPath})

        if(result.success) return res.status(201).json({success: true, id: result.resultId})
        else return res.status(500).json({ success: false, message: "No se pudo agregar la pelicula" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ success: false, message: "Error de servidor" })
    }
}

export const editMovie = async (req, res)=>{
    const { id, name, slug, description, duration, clasification, poster } = req.body
    
    if(!id, !name || !description || !duration || !clasification || !poster){
        console.log(req.body)
        return res.status(400).json({success: false, message: "Faltan datos"})  
    } 
    const posterPath = req.file ? `./public/posters/${poster}` : poster
    try {
        const result = await Movies.editMovie({id, name, slug, description, duration, clasification, poster: posterPath})

        if(result.success) return res.status(201).json({success: true, id: result.resultId})
        else return res.status(500).json({ success: false, message: "No se pudo editar la pelicula" })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ success: false, message: "Error de servidor" })
    }
}