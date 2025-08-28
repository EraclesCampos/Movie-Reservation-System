import express from 'express'
import { register, login, getData } from '../controllers/user.controller.js' 
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/data', getData)

export default router