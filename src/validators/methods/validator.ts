import { generalError } from '@/errors/GeneralError'
import type { NextFunction, Request, Response } from 'express'

export const validateMethod = (
  req: Request,
  res: Response,
  next: NextFunction,
  allowedMethods: string[]
) => {
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json(generalError('Method not allowed'))
  }
  next()
}
