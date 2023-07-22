import connectDB from '@/configs/db'
import { ENV_VARS, validateEnvVars } from '@/configs/env'
import httpServer from '@/configs/http'

const bootstrap = () => {
  try {
    validateEnvVars()
    console.log('starting server...')
    httpServer.listen(ENV_VARS.PORT, async () => {
      await connectDB(ENV_VARS.MONGO_URL)

      console.log('SERVER RUNNING ON PORT ' + ENV_VARS.PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

bootstrap()
