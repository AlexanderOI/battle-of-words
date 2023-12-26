import { useEffect, useState } from 'react'
import { BattleText } from './BattleText'
import { usePlayerContext } from '../../context/PlayerDataContext'
import { Player } from '../common/Player'
import { useSocket } from '../../context/SocketContext'

interface Room {
  [key: string]: PlayerData
}

interface PlayerData {
  name: string
  lifePoints: number
  attack: string
}

export function GameRoom() {
  const { playerData, setPlayerData } = usePlayerContext()
  const socket = useSocket()

  const [playerLifePercentage, setPlayerLifePercentage] = useState({
    player1: 100.0,
    player2: 100.0
  })

  socket.on('dataPlayers', (room: Room) => {
    let numPlayer = '1'
    console.log(room)
    for (const clave in room) {
      if (room.hasOwnProperty(clave)) {
        setPlayerData(prev => ({
          ...prev,
          ['player' + numPlayer]: room[clave]
        }))
      }
      numPlayer = '2'
    }
  })


  useEffect(() => {
    console.log('Effect is running');
    setPlayerLifePercentage({
      player1: (playerData.player1.lifePoints / 300) * 100,
      player2: (playerData.player2.lifePoints / 300) * 100
    })
  }, [playerData])

  console.log(playerData)

  return (
    <div className="flex flex-col justify-around items-center w-3/4 m-5 h-full max-md:w-full max-md:m-0">
      <div className='flex justify-around items-center w-full h-full'>
        <Player
          name={playerData.player1.name}
          lifePercentage={playerLifePercentage.player1}
          word={playerData.player1.attack}
        />

        <Player
          name={playerData.player2.name}
          lifePercentage={playerLifePercentage.player2}
          word={playerData.player2.attack}
        />

      </div>
      <div className='bg-sky-950 p-5 w-full rounded-2xl'>
        <BattleText />
      </div>
    </div>
  )
}
