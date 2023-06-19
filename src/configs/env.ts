import { Type, type Static } from '@sinclair/typebox'
import Ajv from 'ajv'
import addErrors from 'ajv-errors'
import * as dotenv from 'dotenv'

dotenv.config()

const Env = {
  PORT: Type.String({
    pattern: '^(?:[0-5]?[0-9]{1,4}|6[0-4][0-9]{3}|65000)$',
    errorMessage: 'The PORT must be a number between 0 and 65000'
  }),
  MONGO_URL: Type.String({
    pattern: '^[^\\s\\n]+$',
    errorMessage: 'The URL cannot contain white spaces'
  }),
  JWT_PRIVATE_KEY: Type.String({
    maxLength: 100,
    pattern: '^[^\\s\\n]+$',
    errorMessage: {
      maxLength: 'Invalid format error, must not exceed 100 characters',
      pattern: 'The JWT key cannot contain white spaces'
    }
  })
}

const EnvSchema = Type.Object(Env)
type EnvType = Static<typeof EnvSchema>

function validateEnvVars(config: any): EnvType | Error {
  const ajv = new Ajv({ allErrors: true })
  addErrors(ajv)
  const validate = ajv.compile(EnvSchema)
  const valid = validate(config)

  if (!valid) {
    const errors = JSON.stringify(
      validate.errors!.map(error => error.message),
      null,
      2
    )
    throw new Error(errors)
  }

  return config as EnvType
}

function getEnvVars(): EnvType {
  const vars = {}

  for (const key in Env) {
    const value = process.env[key]
    Object.defineProperty(vars, key, { value, enumerable: true })
  }

  return vars as EnvType
}

function env() {
  const ENV_VARS = getEnvVars()
  let isEnvValid: boolean

  try {
    validateEnvVars(ENV_VARS)
    isEnvValid = true
  } catch (error) {
    isEnvValid = false
    console.log(error)
  }
  return { ENV_VARS, isEnvValid }
}

export const { ENV_VARS, isEnvValid } = env()
