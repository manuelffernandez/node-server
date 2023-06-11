import { type Request, type Response, type NextFunction } from 'express'
import { jwtVerify } from 'jose'

const validateJWTDTO = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).send('Invalid token format')
  }

  const encodedJWTKey = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)

  jwtVerify(authorization, encodedJWTKey)
    .then(jwtVerifyResult => {
      const { payload } = jwtVerifyResult

      if (!payload.id) {
        return res.status(401).send('Missing user ID in token payload')
      }
      Object.defineProperty(req, 'id', payload.id)

      next()
    })
    .catch(err => {
      console.log(err)
      return res.status(401).send('Unauthorized')
    })
}

export default validateJWTDTO
