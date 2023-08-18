import type { NextFunction, Request, Response } from 'express'
import { validateMethod } from './validator'

export const validateUserRequestMethod = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

  validateMethod(req, res, next, allowedMethods)
}
