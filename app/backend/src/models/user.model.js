import { db } from '../config/connection.js'
import bcryptjs from 'bcryptjs'
import dotenv from "dotenv"
import { createToken } from '../utils/createToken.js'

dotenv.config()

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const register = async ({name, email, password})=>{
    if(!name || !email || !password){
        return {success: false, message: "Datos incompletos"}
    }
    if(!validateEmail(email)){
        return {success: false, message: "Email invalido"}
    }
    try {
        
        const salt = bcryptjs.genSaltSync(5)
        const hashedPassword = bcryptjs.hashSync(password, salt)
        const result = await db.execute("INSERT INTO users (id, name, email, password, role) VALUES (NULL, ?, ?, ?, 'user')",
            [name, email, hashedPassword]
        )
        return {success: true, data: result}
    } catch (e) {
        console.log(e)
        return {success: false, message: "Error de servidor"}
    }
}

export const login = async ({email, password})=>{
    if(!email || !password) return {success: false, message: "Datos incompletos"}
    try{
        const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email])
        if(rows.length > 0){
            const user = rows[0]
            const passwordDecoded = await bcryptjs.compare(password, user.password)
            if(!passwordDecoded) return {success: false, message: 'Email o contraseña incorrectos'}

            const {token} = createToken({userId: user.id, userRole: user.role})
            return {success: true, message: "Login succesful", token, user}
        }else{
            return {success: false, message: 'Email o contraseña incorrectos'}
        }
    }catch(e){
        console.log(e)
        return {success: false, message: 'Error de servidor'}
    }
}