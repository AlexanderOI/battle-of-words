import { createContext, useContext, useState, ReactNode } from 'react'
import { FormRoomData } from '../types'

interface RoomContextProps {
  formRoomData: FormRoomData
  setFormRoomData: React.Dispatch<React.SetStateAction<FormRoomData>>
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined)

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [formRoomData, setFormRoomData] = useState<FormRoomData>({
    username: '',
    roomname: '',
    code: '',
    gamemode: '',
    roomtype: 'public',
  })

  return (
    <RoomContext.Provider value={{ formRoomData, setFormRoomData }}>
      {children}
    </RoomContext.Provider>
  )
}

export const useRoomContext = (): RoomContextProps => {
  const context = useContext(RoomContext)
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider')
  }
  return context
}
