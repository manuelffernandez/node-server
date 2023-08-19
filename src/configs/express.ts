import userRouter from '@/routes/user.route'
import { validateUserRequestMethod } from '@/validators/methods/user-methods'
import express from 'express'

const expressApp = express()

// Middleware
expressApp.use(express.json())

// Routes
expressApp.use('/user', validateUserRequestMethod, userRouter)

export default expressApp
