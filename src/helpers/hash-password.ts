import { hash } from 'bcrypt'

const hashPassword = async (password: string) => {
  const SALT = 10
  const hashedPass = await hash(password, SALT)
  return hashedPass
}

export default hashPassword
