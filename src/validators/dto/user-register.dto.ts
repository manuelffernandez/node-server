import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import type { NextFunction, Request, Response } from 'express'
import {
  emailDTOSchema,
  lastNameDTOSchema,
  nameDTOSchema,
  passwordDTOSchema
} from './dto-schemas'
import { getErrors } from '@/helpers/dto-error'

export const RegisterDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    lastName: lastNameDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties:
        'Invalid format error, contains unrecognized additional properties'
    }
  }
)

const ajv = new Ajv({ allErrors: true })
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addFormats(ajv, ['email', 'uuid'])
addErrors(ajv)

const dtoValidator = ajv.compile(RegisterDTOSchema)

const validateRegisterDTO = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDTOValid = dtoValidator(req.body)

  if (!isDTOValid) {
    const errorObject = getErrors(dtoValidator.errors!)
    return res.status(400).json(errorObject)
  }

  next()
}

export default validateRegisterDTO
