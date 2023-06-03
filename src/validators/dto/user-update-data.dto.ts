import { lastNameDTOSchema, nameDTOSchema } from '@/validators/dto/dto-schemas'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import type { NextFunction, Request, Response } from 'express'

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

export default validateUpdateDataDTO
