import type { Static } from '@sinclair/typebox'
import type { RegisterDTOSchema } from '@/validators/dto/user-register.dto'
import type { UpdateDataDTOSchema } from '@/validators/dto/user-update-data.dto'
import type { LoginDTOSchema } from '@/validators/dto/user-login.dto'
import type { UnregisterDTOSchema } from '@/validators/dto/user-unregister.dto'
import type { UpdateEmailDTOSchema } from '@/validators/dto/user-update-email.dto'
import type { UpdatePasswordDTOSchema } from '@/validators/dto/user-update-password.dto'

export type LoginDTOType = Static<typeof LoginDTOSchema>
export type RegisterDTOType = Static<typeof RegisterDTOSchema>
export type UnregisterDTOType = Static<typeof UnregisterDTOSchema>
export type UpdateDataDTOType = Static<typeof UpdateDataDTOSchema>
export type UpdateEmailDTOType = Static<typeof UpdateEmailDTOSchema>
export type UpdatePasswordDTOType = Static<typeof UpdatePasswordDTOSchema>

export interface JWTValidatedRequest {
  id: string
}
