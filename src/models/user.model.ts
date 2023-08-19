import mongoose from 'mongoose'
const { Schema, model } = mongoose

interface IUser {
  _id: string
  name: string
  lastName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date[]
}

const userSchema = new Schema<IUser>({
  _id: { type: String, _id: false },
  name: { type: String, require: true, minLength: 2, maxLength: 20 },
  lastName: { type: String, require: true, minLength: 4, maxLength: 20 },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  createdAt: { type: Date, require: true, default: Date.now },
  updatedAt: { type: [Date], require: false }
})

const UserModel = model<IUser>('User', userSchema)

export default UserModel
