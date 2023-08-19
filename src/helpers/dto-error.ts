import type { AJVError } from '@/types'

const iterateOnDTOErrors = (error: AJVError) => {
  const { instancePath, message, params } = error
  const { errors } = params

  if (errors[0].keyword === 'additionalProperties') {
    return errors.map((e: any) => ({
      field: e.params.additionalProperty,
      message: e.message
    }))
  }

  return [
    {
      field: params.missingProperty ?? instancePath.substring(1),
      message
    }
  ]
}

export const getErrors = (DTOErrors: AJVError[]) => ({
  errors: DTOErrors.map(iterateOnDTOErrors).flat()
})
