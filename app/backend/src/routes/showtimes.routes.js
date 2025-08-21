import express from 'express'
import { createShowtime, getAllShowtimes, getShowtime } from '../controllers/showtime.controller.js'
import { verifyToken, isAdmin } from '../middlewares/authorization.js'

const router = express.Router()

router.post("/create-showtime", verifyToken, isAdmin, createShowtime)
router.get("/get-all", getAllShowtimes)
router.get("/:id", getShowtime)

export default router