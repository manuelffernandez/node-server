import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', () => {})
userRouter.post('/login', () => {})
userRouter.get('/profile', () => {})
userRouter.patch('/data', () => {})
userRouter.patch('/email', () => {})
userRouter.patch('/password', () => {})
userRouter.delete('/unregister', () => {})

export default userRouter
