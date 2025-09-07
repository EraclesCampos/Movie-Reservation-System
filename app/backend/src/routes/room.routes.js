import express from 'express'
import { getRooms, createRoom } from '../controllers/rooms.controller.js'
import { verifyToken, isAdmin } from '../middlewares/authorization.js'

const router = express.Router()

router.get("/get-all", verifyToken, isAdmin, getRooms)
router.post("/create-room", verifyToken, isAdmin, createRoom)

export default router