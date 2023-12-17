import express, { json } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import logger from 'morgan'
import { corsMiddleware } from './middleware/cors'
import { gameController } from './socket/socket.controller'

const PORT = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

gameController(io)

app.use(logger('dev'))
app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

server.listen(PORT, () => {
  console.log(`Server runnig om port ${PORT}`)
})