import express from 'express'
import { getSeats, getReservedSeats, createSeats } from '../controllers/seats.controller.js'
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
const router = express.Router()

router.get("/get-seats", getSeats)
router.get("/get-reserved-seats", getReservedSeats)
router.post("/create-seats", verifyToken, isAdmin, createSeats)

export default router