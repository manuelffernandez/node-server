import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const expressApp = express()

expressApp.listen(process.env.PORT, () => {
  console.log('SERVER RUNNING ON PORT  ' + process.env.PORT!.toString())
})
