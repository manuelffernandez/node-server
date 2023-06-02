import { Type } from '@sinclair/typebox'

export const idDTOSchema = Type.String({
  format: 'uuid',
  errorMessage: {
    type: 'Invalid type error, must be a string',
    format: 'Invalid format error, must be on UUID format (RFC 4122)'
  }
})

export const nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    type: 'Invalid type error, must be a string',
    minLength: 'Invalid format error, must contain at least 2 characters',
    maxLength: 'Invalid format error, must not exceed 20 characters'
  }
})

export const middleNameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    type: 'Invalid type error, must be a string',
    minLength: 'Invalid format error, must contain at least 2 characters',
    maxLength: 'Invalid format error, must not exceed 20 characters'
  }
})

export const lastNameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: {
    type: 'Invalid type error, must be a string',
    minLength: 'Invalid format error, must contain at least 2 characters',
    maxLength: 'Invalid format error, must not exceed 20 characters'
  }
})

export const emailDTOSchema = Type.String({
  format: 'email',
  errorMessage: {
    type: 'Invalid type error, must be a string',
    format: 'Invalid format error, must be a valid email address'
  }
})

export const passwordDTOSchema = Type.String({
  format: 'password',
  minLength: 10,
  maxLength: 25,
  errorMessage: {
    type: 'Invalid type error, must be a string',
    format: 'Invalid format error, it should contain at least one uppercase letter, one lowercase letter, and one number.',
    minLength: 'Invalid format error, must contain at least 10 characters',
    maxLength: 'Invalid format error, must not exceed 25 characters'
  }
})
