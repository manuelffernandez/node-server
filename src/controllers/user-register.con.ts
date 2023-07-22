import type { RegisterDTOType } from '@/types'
import type { Request, Response } from 'express'
import UserModel from '@/models/user.model'
import { hash } from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

const userRegisterController = async (
  req: Request<any, any, RegisterDTOType>,
  res: Response
) => {
  const { email, lastName, name, password } = req.body

  try {
    const hashedPass = await hash(password, 10)

    const _id = uuidv4()
    const userById = await UserModel.findById(_id).exec()
    if (userById) return res.status(409).send('Conflict: ID collision')

    const userByEmail = await UserModel.findOne({ email }).exec()
    if (userByEmail)
      return res.status(409).send('Conflict: Email already exists')

    const newUser = new UserModel({
      _id,
      email,
      name,
      lastName,
      password: hashedPass
    })

    await newUser.save()
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        email,
        name,
        lastName
      }
    })
  } catch (error) {
    console.log('Error while registering user', error)
    return res.status(500).send('Internal Server Error')
  }
}

export default userRegisterController
