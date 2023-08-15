import { type Request, type Response, type NextFunction } from 'express'
import { jwtVerify } from 'jose'

const validateJWTDTO = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(400).send(`Missing 'authorization' header`)
  }

  if (!authorization.startsWith('Bearer ')) {
    return res
      .status(400)
      .send(
        `Invalid token format, 'Bearer' prefix on authorization header required.`
      )
  }

  const indexStartToken = 7
  const token = authorization.slice(indexStartToken)

  const encodedJWTKey = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)

  jwtVerify(token, encodedJWTKey)
    .then(jwtVerifyResult => {
      const { payload } = jwtVerifyResult

      if (!payload.id) {
        return res.status(401).send('Missing user ID in token payload')
      }
      Object.defineProperty(req.body, 'id', {
        value: payload.id,
        enumerable: true
      })

      next()
    })
    .catch(err => {
      console.log(err)
      return res.status(401).send('Unauthorized')
    })
}

export default validateJWTDTO
