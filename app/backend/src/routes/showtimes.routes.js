import express from 'express'
import { createShowtime, getAllShowtimes } from '../controllers/showtime.controller.js'
import { verifyToken, isAdmin } from '../middlewares/authorization.js'

const router = express.Router()

router.post("/create-showtime", createShowtime)
router.get("/get-all", getAllShowtimes)

export default router