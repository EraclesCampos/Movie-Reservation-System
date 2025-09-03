import express from 'express'
import { getRooms } from '../controllers/rooms.controller.js'
import { verifyToken, isAdmin } from '../middlewares/authorization.js'

const router = express.Router()

router.get("/get-all", verifyToken, isAdmin, getRooms)

export default router