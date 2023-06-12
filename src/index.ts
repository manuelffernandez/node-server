import '@/configs/env'
import httpServer from '@/configs/http'
import connectDB from './configs/db'

const bootstrap = () => {
  console.log('starting server...')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  httpServer.listen(process.env.PORT, async () => {
    await connectDB(process.env.MONGO_URL!)

    console.log('SERVER RUNNING ON PORT ' + process.env.PORT!.toString())
  })
}

bootstrap()
