import type { Static } from '@sinclair/typebox'
import type { RegisterDTOSchema } from '@/validators/dto/user-register.dto'
import type { UpdateDataDTOSchema } from '@/validators/dto/user-update-data.dto'
import type { LoginDTOSchema } from '@/validators/dto/user-login.dto'
import type { UnregisterDTOSchema } from '@/validators/dto/user-unregister.dto'
import type { UpdateEmailDTOSchema } from '@/validators/dto/user-update-email.dto'
import type { UpdatePasswordDTOSchema } from '@/validators/dto/user-update-password.dto'
import type { ErrorObject } from 'ajv'
import type { Request } from 'express'

export type LoginDTOType = Static<typeof LoginDTOSchema>
export type RegisterDTOType = Static<typeof RegisterDTOSchema>
export type UnregisterDTOType = Static<typeof UnregisterDTOSchema>
export type UpdateDataDTOType = Static<typeof UpdateDataDTOSchema>
export type UpdateEmailDTOType = Static<typeof UpdateEmailDTOSchema>
export type UpdatePasswordDTOType = Static<typeof UpdatePasswordDTOSchema>

export type AJVError = ErrorObject<string, Record<string, any>, unknown>
export interface JWTValidatedRequest {
  id: string
}

// Request object type cannot be modified within middlewares, due this 'locals' property is wrapped with Partial utility type.
// This type declaration avoids the 'missing property' error on routes that implements middlewares that use custom typed requests.
// When trying to access 'locals' it's neccesary to make a non-null assertion on it.
export type CustomRequest<T, P> = Request<any, any, P, any> &
  Partial<{ locals: T }>
