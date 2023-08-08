import mongoose from 'mongoose'

const connectDB = async (url: string) => {
  console.log('connecting to database...')
  try {
    await mongoose.connect(url)
    console.log('Database connected')
  } catch (error: any) {
    console.log('something went wrong trying to connect to the database')
    throw new Error(error)
  }
}

export default connectDB
