import express from 'express'
import { getSeats, getReservedSeats, createSeats } from '../controllers/seats.controller.js'
import { isAdmin, verifyToken } from '../middlewares/authorization.js'
const router = express.Router()

router.get("/get-seats", verifyToken, getSeats)
router.get("/get-reserved-seats", verifyToken, getReservedSeats)
router.post("/create-seats", verifyToken, isAdmin, createSeats)

export default router