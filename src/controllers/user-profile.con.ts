import UserModel from '@/models/user.model'
import type { JWTValidatedRequest } from '@/types'
import type { Request, Response } from 'express'

const userProfileController = async (
  req: Request<any, any, JWTValidatedRequest>,
  res: Response
) => {
  const { id } = req.body

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
