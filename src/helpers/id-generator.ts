import UserModel from '@/models/user.model'
import { v4 as uuidv4 } from 'uuid'

const generateUniqueID = async (): Promise<string> => {
  const maxIterations = 10
  let id: string
  let isConflict = false
  let iterations = 0

  do {
    id = uuidv4()
    iterations++
    const user = await UserModel.findById(id).exec()
    if (!user) {
      isConflict = false
    } else {
      isConflict = true
    }
  } while (isConflict && iterations < maxIterations)

  if (iterations >= maxIterations) {
    throw new Error(
      'maximum number of attempts to generate the user id reached'
    )
  }

  return id
}

export default generateUniqueID
