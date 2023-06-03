import mongoose from 'mongoose'

const connectDB = async (url: string) => {
  console.log('connecting to database...')
  await mongoose
    .connect(url)
    .then(() => {
      console.log('Database connected')
    })
    .catch(e => {
      console.log('something went wrong')
      console.log(e)
    })
}

export default connectDB
