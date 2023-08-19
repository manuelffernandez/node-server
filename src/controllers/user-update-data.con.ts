import { generalError } from '@/errors/GeneralError'
import UserModel from '@/models/user.model'
import type {
  CustomRequest,
  JWTValidatedRequest,
  UpdateDataDTOType
} from '@/types'
import type { Response } from 'express'

const userUpdateDataController = async (
  req: CustomRequest<JWTValidatedRequest, UpdateDataDTOType>,
  res: Response
) => {
  try {
    const { name, lastName } = req.body
    const { id } = req.locals!

    const user = await UserModel.findById(id).exec()
    if (!user)
      return res.status(404).json(generalError(`User with id:${id} not found`))

    user.name = name
    user.lastName = lastName

    await user.save()
    return res.status(200).send('User updated')
  } catch (error) {
    console.log('Error while udpate user data', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userUpdateDataController
