import { compare } from 'bcrypt'

const verifyPassword = async (
  enteredPassword: string,
  userPassword: string
): Promise<boolean> => {
  const isPassCorrect = await compare(enteredPassword, userPassword)
  return isPassCorrect
}

export default verifyPassword
