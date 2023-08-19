import { generalError } from '@/errors/GeneralError'
import verifyPassword from '@/helpers/verify-password'
import UserModel from '@/models/user.model'
import type {
  CustomRequest,
  JWTValidatedRequest,
  UpdateEmailDTOType
} from '@/types'
import type { Response } from 'express'

const userUpdateEmailController = async (
  req: CustomRequest<JWTValidatedRequest, UpdateEmailDTOType>,
  res: Response
) => {
  try {
    const { email, password } = req.body
    const { id } = req.locals!

    const user = await UserModel.findById(id).exec()
    if (!user)
      return res.status(404).json(generalError(`User with id:${id} not found`))

    const isPassCorrect = await verifyPassword(password, user.password)
    if (!isPassCorrect) return res.status(403).send('Invalid credentials')

    user.email = email

    await user.save()
    return res.status(200).send('User email updated')
  } catch (error) {
    console.log('Error while updating email', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userUpdateEmailController
