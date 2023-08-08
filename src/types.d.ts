import type { Static } from '@sinclair/typebox'
import type { RegisterDTOSchema } from '@/validators/dto/user-register.dto'

export type RegisterDTOType = Static<typeof RegisterDTOSchema>

export interface JWTValidatedRequest extends Request {
  id: string
}
