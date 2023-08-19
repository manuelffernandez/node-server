import { getErrors } from '@/helpers/dto-error'
import type { CustomRequest, JWTValidatedRequest } from '@/types'
import { emailDTOSchema, passwordDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import addFormats from 'ajv-formats'
import type { NextFunction, Response } from 'express'

export const UpdateEmailDTOSchema = Type.Object(
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

const dtoValidator = ajv.compile(UpdateEmailDTOSchema)

const validateUpdateEmailDTO = (
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

export default validateUpdateEmailDTO
