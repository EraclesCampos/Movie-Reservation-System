import * as Users from '../models/user.model.js'

export const register = async (req, res)=>{
    try{
        const result = await Users.register({...req.body})
        if(result.success){
            return res.status(201).json({success: true, message: 'User registered'})
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}

export const login = async (req, res)=>{
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
            return res.status(400).json({status: 'ok', message: result.message})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}
