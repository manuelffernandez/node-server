import UserModel from '@/models/user.model'

const verifyEmailInDB = async (email: string): Promise<boolean> => {
  const user = await UserModel.findOne({ email }).exec()
  return !!user
}

export default verifyEmailInDB
