import jsonwebtoken from 'jsonwebtoken'

export const createToken = ({userId, userRole})=>{
    const token = jsonwebtoken.sign({id: userId, role: userRole}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    return {token}
}