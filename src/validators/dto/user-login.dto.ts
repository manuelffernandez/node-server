import { emailDTOSchema, passwordDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import type { NextFunction, Request, Response } from 'express'

export const LoginDTOSchema = Type.Object(
  {
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
addFormats(ajv, ['email'])
addErrors(ajv)

const dtoValidator = ajv.compile(LoginDTOSchema)

const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isDTOValid = dtoValidator(req.body)

  if (!isDTOValid) {
    const errorObject = {
      errors: dtoValidator.errors?.map(error => ({
        field: error.params.missingProperty ?? error.instancePath.substring(1),
        message: error.message
      }))
    }

    return res.status(400).send(errorObject)
  }

  next()
  return undefined
}

export default validateLoginRequest
