import { passwordDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import type { NextFunction, Request, Response } from 'express'

export const UpdatePasswordDTOSchema = Type.Object(
  {
    oldPassword: passwordDTOSchema,
    newPassword: passwordDTOSchema
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
addErrors(ajv)

const dtoValidator = ajv.compile(UpdatePasswordDTOSchema)

const validateUpdatePasswordDTO = (
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

export default validateUpdatePasswordDTO