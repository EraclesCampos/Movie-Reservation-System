import { db } from '../config/connection.js'
import bcryptjs from 'bcryptjs'
import { createToken } from '../utils/createToken.js'

export const register = async ({name, email, password})=>{
    try {
        const salt = bcryptjs.genSaltSync(5)
        const hashedPassword = bcryptjs.hashSync(password, salt)
        const [result] = await db.execute("INSERT INTO users (id, name, email, password, role) VALUES (NULL, ?, ?, ?, 'user')",
            [name, email, hashedPassword]
        )
        return {success: true, id: result.insertId}
    } catch (e) {
        console.log(e)
        if(error.code === "ER_DUP_ENTRY") return {success: false, message: "Email ya registrado"}
        return {success: false, message: "Error de servidor"}
    }
}

export const login = async ({email, password})=>{
    
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

export const getData = async (id)=>{
    try {
        const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id])
        if(rows.length === 0) return {success: false, message: "Usuario no encontrado"}
        return {success: true, data: rows[0]}
    } catch (e) {
        console.log(e)
        return {success: false, message: "Error de servidor"}
    }
}

export const getUsers = async ()=>{
    try {
        const [rows] = await db.execute("SELECT * FROM users")
        return rows
    } catch (error) {
        console.log(error)
        return {success: false, message: "Error de servidor"}
    }
}