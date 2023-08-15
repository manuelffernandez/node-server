import type { RegisterDTOType } from '@/types'
import type { Request, Response } from 'express'
import UserModel from '@/models/user.model'
import { hash } from 'bcrypt'
import generateUniqueID from '@/helpers/id-generator'
import verifyEmailInDB from '@/helpers/verify-email'
import { generalError } from '@/errors/GeneralError'

const userRegisterController = async (
  req: Request<any, any, RegisterDTOType>,
  res: Response
) => {
  const { email, lastName, name, password } = req.body

  try {
    const hashedPass = await hash(password, 10)

    const _id = await generateUniqueID()

    const isEmailRegistered = await verifyEmailInDB(email)
    if (isEmailRegistered)
      return res
        .status(409)
        .json(generalError('Conflict: Email already registered'))

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
