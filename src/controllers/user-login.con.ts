import verifyPassword from '@/helpers/verify-password'
import UserModel from '@/models/user.model'
import type { RegisterDTOType } from '@/types'
import type { Request, Response } from 'express'
import { SignJWT } from 'jose'

const userLoginController = async (
  req: Request<any, any, RegisterDTOType>,
  res: Response
) => {
  const { email, password } = req.body

  try {
    const userByEmail = await UserModel.findOne({ email }).exec()
    if (!userByEmail) return res.status(403).send('Invalid credentials')

    const isPassCorrect = await verifyPassword(password, userByEmail.password)
    if (!isPassCorrect) return res.status(403).send('Invalid credentials')

    const encodedJWTKey = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)

    const jwt = await new SignJWT({ id: userByEmail._id })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(encodedJWTKey)

    return res.status(200).send({ jwt })
  } catch (error) {
    console.log('Error while login', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userLoginController
