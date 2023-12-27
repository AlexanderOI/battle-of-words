import { createContext, useContext, useState, ReactNode, SetStateAction } from 'react'

interface RoomCodeContextProps {
  roomCode: string
  setRoomCode: React.Dispatch<SetStateAction<string>>
}

const RoomCodeContext = createContext<RoomCodeContextProps | undefined>(undefined)

export const RoomCodeProvider = ({ children }: { children: ReactNode }) => {
  const [roomCode, setRoomCode] = useState<string>('')

  return (
    <RoomCodeContext.Provider value={{ roomCode, setRoomCode }}>
      {children}
    </RoomCodeContext.Provider>
  )
}

export const useRoomCodeContext = (): RoomCodeContextProps => {
  const context = useContext(RoomCodeContext)
  if (!context) {
    throw new Error('useRoomCodeContext must be used within a RoomCodeProvider')
  }
  return context
}
