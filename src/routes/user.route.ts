import {
  userLoginController,
  userRegisterController,
  userProfileController
} from '@/controllers'
import {
  validateLoginDTO,
  validateJWTDTO,
  validateRegisterDTO
  // validateUnregisterDTO,
  // validateUpdateDataDTO,
  // validateUpdateEmailDTO,
  // validateUpdatePasswordDTO
} from '@/validators/dto'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', validateRegisterDTO, userRegisterController)
userRouter.post('/login', validateLoginDTO, userLoginController)
userRouter.get('/profile', validateJWTDTO, userProfileController)
// userRouter.patch(
//   '/data',
//   validateJWTDTO,
//   validateUpdateDataDTO,
//   userUpdateDataController
// )
// userRouter.patch(
//   '/email',
//   validateJWTDTO,
//   validateUpdateEmailDTO,
//   userUpdateEmailController
// )
// userRouter.patch(
//   '/password',
//   validateJWTDTO,
//   validateUpdatePasswordDTO,
//   userUpdatePasswordController
// )
// userRouter.delete(
//   '/unregister',
//   validateJWTDTO,
//   validateUnregisterDTO,
//   userUnregisterController
// )

export default userRouter
