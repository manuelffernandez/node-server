import { createServer } from 'http'
import expressApp from './express'

const httpServer = createServer(expressApp)

export default httpServer
