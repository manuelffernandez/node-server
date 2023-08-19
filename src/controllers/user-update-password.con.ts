import { generalError } from '@/errors/GeneralError'
import hashPassword from '@/helpers/hash-password'
import verifyPassword from '@/helpers/verify-password'
import UserModel from '@/models/user.model'
import type {
  CustomRequest,
  JWTValidatedRequest,
  UpdatePasswordDTOType
} from '@/types'
import type { Response } from 'express'

const userUpdatePasswordController = async (
  req: CustomRequest<JWTValidatedRequest, UpdatePasswordDTOType>,
  res: Response
) => {
  try {
    const { oldPassword, newPassword } = req.body
    const { id } = req.locals!

    const user = await UserModel.findById(id).exec()
    if (!user)
      return res.status(404).json(generalError(`User with id:${id} not found`))

    const isPassCorrect = await verifyPassword(oldPassword, user.password)
    if (!isPassCorrect) return res.status(403).send('Invalid credentials')

    const hashedPass = await hashPassword(newPassword)

    user.password = hashedPass

    await user.save()
    return res.status(200).send('User password updated')
  } catch (error) {
    console.log('Error while updating password', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userUpdatePasswordController
