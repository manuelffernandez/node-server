import { getErrors } from '@/helpers/dto-error'
import type { CustomRequest, JWTValidatedRequest } from '@/types'
import { lastNameDTOSchema, nameDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import type { NextFunction, Response } from 'express'

export const UpdateDataDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    lastName: lastNameDTOSchema
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
addErrors(ajv)

const dtoValidator = ajv.compile(UpdateDataDTOSchema)

const validateUpdateDataDTO = (
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

export default validateUpdateDataDTO
