import UserModel from '@/models/user.model'
import type { CustomRequest, JWTValidatedRequest } from '@/types'
import type { Response } from 'express'

const userProfileController = async (
  req: CustomRequest<JWTValidatedRequest, undefined>,
  res: Response
) => {
  const { id } = req.locals!

  try {
    const userById = await UserModel.findById(id).exec()
    if (!userById) return res.status(404).send(`User with id:${id} not found`)

    const { _id, email, name, lastName } = userById

    return res.status(200).json({ _id, email, name, lastName })
  } catch (error) {
    console.log('Error while login', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userProfileController
