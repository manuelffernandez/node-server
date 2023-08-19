import { getErrors } from '@/helpers/dto-error'
import type { CustomRequest, JWTValidatedRequest } from '@/types'
import { Type } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import type { NextFunction, Response } from 'express'
import { passwordDTOSchema } from './dto-schemas'

export const UnregisterDTOSchema = Type.Object(
  {
    password: passwordDTOSchema
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties:
        "'Invalid format' error. Contains unrecognized additional properties"
    }
  }
)

const ajv = new Ajv({ allErrors: true })
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
addErrors(ajv)

const dtoValidator = ajv.compile(UnregisterDTOSchema)

const validateUnregisterDTO = (
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

export default validateUnregisterDTO
