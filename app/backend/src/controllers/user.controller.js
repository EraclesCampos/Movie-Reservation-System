import * as Users from '../models/user.model.js'

export const register = async (req, res)=>{
    try{
        const result = await Users.register({...req.body})
        if(result.success){
            return res.status(201).send({success: true, message: 'User registered'})
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
        console.log(result)
        if(result.success){
            return res.cookie('jwt', result.token, result.cookieOption).status(200).send({status: 'ok', message: 'User logued'})
        }
        else{
            return res.status(400).send({status: 'ok', message: result.message})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({success: false, message: 'Error de servidor'})
    }
}
