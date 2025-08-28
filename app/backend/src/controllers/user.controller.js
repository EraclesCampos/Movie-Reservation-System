import * as Users from '../models/user.model.js'

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const register = async (req, res)=>{
    const { name, email, password } = req.body
    if(!name || !email || !password){
            return res.status(402).json({success: false, message: "Datos incompletos"})
        }
        if(!validateEmail(email)){
            return res.status(401).json({success: false, message: "Email invalido"})
        }
    try{
        const result = await Users.register({...req.body})
        if(result.success){
            return res.status(201).json({success: true, message: 'Usuario registrado', userId: result.id})
        }else{
            return res.status(401).json({success: false, message: result.message})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}

export const login = async (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) return res.status(402).json({success: false, message: "Datos incompletos"})
    try {
        const result = await Users.login({...req.body})
        if(result.success){
            return res.status(200).json(
                {
                    status: 'ok', 
                    message: result.message, 
                    token: result.token, 
                    user: {
                        id: result.user.id,
                        name: result.user.name,
                        email: result.user.email,
                        role: result.user.role
                    }
                }
            )
        }
        else{
            return res.status(400).json({success: false, message: result.message})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}

export const getData = async (req, res)=>{
    const {id} = req.body
    if(!id || typeof(id) !== "number") return res.status(401).json({success: false, message: "Id invalido"})
    try {
        const data = await Users.getData()
        if(data.success){
            return res.status(200).json(
                {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                }
            )
        }
    } catch (e) {
        
    }
}