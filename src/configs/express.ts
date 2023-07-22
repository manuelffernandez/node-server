import userRouter from '@/routes/user.route'
import express from 'express'

const expressApp = express()

// Middleware
expressApp.use(express.json())

// Routes
expressApp.use('/user', userRouter)

export default expressApp
