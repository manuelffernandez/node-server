import { generalError } from '@/errors/GeneralError'
import verifyPassword from '@/helpers/verify-password'
import UserModel from '@/models/user.model'
import type {
  CustomRequest,
  JWTValidatedRequest,
  UnregisterDTOType
} from '@/types'
import type { Response } from 'express'

const userUnregisterController = async (
  req: CustomRequest<JWTValidatedRequest, UnregisterDTOType>,
  res: Response
) => {
  try {
    const { password } = req.body
    const { id } = req.locals!

    const user = await UserModel.findById(id).exec()
    if (!user)
      return res.status(404).json(generalError(`User with id:${id} not found`))

    const isPassCorrect = await verifyPassword(password, user.password)
    if (!isPassCorrect) return res.status(403).send('Invalid credentials')

    await user.deleteOne()
    return res.status(200).send('User deleted')
  } catch (error) {
    console.log('Error while deleting user', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userUnregisterController
