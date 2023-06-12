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
    const errorObject = {
      errors: dtoValidator.errors!.map(error => ({
        field: error.params.missingProperty ?? error.instancePath.substring(1),
        message: error.message
      }))
    }

    return res.status(400).send(errorObject)
  }

  next()
}

export default validateRegisterDTO
