import { ReactNode, createContext, useContext } from 'react'
import io, { Socket } from 'socket.io-client'

const socket = io('')

const SocketContext = createContext<Socket>(socket)

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = io('http://localhost:3000', {
    auth: {
      serverOffset: 0
    }
  })

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}