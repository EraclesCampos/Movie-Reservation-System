import express from 'express'
import { register, login, getData, getUsers } from '../controllers/user.controller.js' 
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/data', getData)
router.get('/get-users', verifyToken, isAdmin, getUsers)

export default router