import * as Showtimes from '../models/showtime.model.js'

export const createShowtime = async (req, res)=>{
    const { roomId, movieId, datetime } = req.body
    if(!roomId || !movieId || !datetime) return res.status(401).json({success: false, message: "Datos incompletos"})
    try{
        const result = await Showtimes.createShowtime({ roomId, movieId, datetime })
        if(result.success) return res.status(201).json({success: result.success, message: result.message, showtimeId: result.showtimeId})
        
        return res.json({success: result.success, message: result.message})
    }catch(e){
        console.log(e)
        return res.json({success: false, message: "Error de servidor"})
    }
}

export const getAllShowtimes = async (req, res) =>{
    try {
        const showtimes = await Showtimes.getAllShowtimes()
        console.log(showtimes)
        return res.json(showtimes)
    } catch (e) {
        console.log(e)
        return res.json()
    }
}