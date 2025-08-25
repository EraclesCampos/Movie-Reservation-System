import jsonwebtoken from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    if(!authHeader) return res.status(401).json({ message: "No autorizado" })

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(402).json({ message: "Token invalido o expirado" })
    }
}

export const isAdmin = async (req, res, next) =>{
    if(req.user?.role !== "admin"){
        return res.status(402).json({ message: "No puedes ejecutar esta accion" })
    }
    next()
}
