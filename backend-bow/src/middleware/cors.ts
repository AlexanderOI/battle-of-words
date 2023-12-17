import cors from 'cors'

const corsOption = {
  origin: 'http://localhost:5173/',
  optionsSuccessStatus: 204,
}

export const corsMiddleware = () => cors(corsOption)