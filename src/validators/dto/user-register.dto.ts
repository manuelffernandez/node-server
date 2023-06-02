import { Type } from '@sinclair/typebox'
import { _id, name, middleName, lastName, email, password } from '@/lib/dto-schemas'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import addErrors from 'ajv-errors'
import type { Request, Response, NextFunction } from 'express'

export const RegisterDTOSchema = Type.Object({
  _id,
  name,
  middleName: Type.Optional(middleName),
  lastName,
  email,
  password
})

const ajv = new Ajv({ allErrors: true })
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addFormats(ajv, ['email', 'uuid'])
addErrors(ajv)

const dtoValidator = ajv.compile(RegisterDTOSchema)

const validateRegisterRequest = (req: Request, res: Response, next: NextFunction) => {
  const isDTOValid = dtoValidator(req.body)

  if (!isDTOValid) {
    const errorObject = {
      errors: dtoValidator.errors?.map(error => ({ field: error.params.missingProperty ?? error.instancePath.substring(1), message: error.message }))
    }

    return res.status(400).send(errorObject)
  }

  next()
  return undefined
}

export default validateRegisterRequest