import mongoose from 'mongoose'

const connectDB = async (url: string) => {
  console.log('connecting to database...')
  try {
    await mongoose.connect(url)
    console.log('Database connected')
  } catch (error) {
    console.log('something went wrong trying to connect to the database', error)
  }
}

export default connectDB
