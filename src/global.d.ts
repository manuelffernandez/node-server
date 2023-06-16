/* eslint-disable @typescript-eslint/no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    PORT: number
    MONGO_URL: string
    JWT_PRIVATE_KEY: string
  }
}
