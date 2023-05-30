import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  name: { type: String, require: true, minLength: 2, maxLength: 20 },
  middleName: { type: String, require: false, minLength: 2, maxLength: 20 },
  lastName: { type: String, require: true, minLength: 4, maxLength: 20 },
  email: { type: String, require: true },
  password: { type: String, require: true },
  createdAt: { type: Date, require: true, default: Date.now },
  updatedAt: { type: [Date], require: false }
})

const userModel = model('User', userSchema)

export default userModel
