import { createContext, useContext, useState, ReactNode, SetStateAction } from 'react'
import { PayerData } from '../types'

interface PlayerContextProps {
  playerData: PayerData
  setPlayerData: React.Dispatch<SetStateAction<PayerData>>
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined)

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playerData, setPlayerData] = useState<PayerData>({
    player1: {
      name: 'player_1',
      lifePoints: 300,
      attack: ''
    },
    player2: {
      name: 'player_2',
      lifePoints: 300,
      attack: ''
    }
  })

  return (
    <PlayerContext.Provider value={{ playerData, setPlayerData }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayerContext = (): PlayerContextProps => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider')
  }
  return context
}
