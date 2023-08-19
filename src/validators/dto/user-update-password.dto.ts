import { getErrors } from '@/helpers/dto-error'
import type { CustomRequest, JWTValidatedRequest } from '@/types'
import { passwordDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import type { NextFunction, Response } from 'express'

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
  req: CustomRequest<JWTValidatedRequest, any>,
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

export default validateUpdatePasswordDTO
