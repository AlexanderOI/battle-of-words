import { useState } from 'react'
import { BattleText } from './BattleText'
import { usePlayerContext } from '../../context/PlayerDataContext'
import { Player } from '../common/Player'
import { useSocket } from '../../context/SocketContext'
import { PayerData } from '../../types'
import { useRoomCodeContext } from '../../context/RoomCodeContext'

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
  const { roomCode } = useRoomCodeContext()
  const socket = useSocket()

  const [isPlayer1, setIsPlayer1] = useState(false)
  const [startGame, setStartGame] = useState(false)
  const [currentWord, setCurrentWord] = useState('word')

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

  socket.on('sendSocketId', (socketId: string) => {
    setIsPlayer1(socketId != socket.id)
  })

  const handleSubmitStartGame = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStartGame(false)

    socket.emit("startGame", roomCode, true)
  }

  socket.on('startGame', (start: boolean) => {
    setStartGame(start)
  })

  socket.on('setCurrentWord', (randomWord: string) => {
    setCurrentWord(randomWord)
  })

  socket.on('wordWrite', (playerDataWord: PayerData) => {
    setPlayerData(playerDataWord)
  })

  return (
    <div className="relative flex flex-col justify-around items-center w-3/4 m-5 h-full max-md:w-full max-md:m-0 z-10">
      {!startGame && isPlayer1 &&
        <form
          className='absolute top-0'
          onSubmit={handleSubmitStartGame}
        >
          <button
            className={`${isPlayer1 ? 'bg-green-600 cursor-pointer' : 'bg-neutral-600 cursor-default'} border-none p-2 rounded-xl`}
            aria-label='Has click para inicia la partida'
          >
            Iniciar Partida
          </button>
        </form>
      }

      {startGame &&
        <div className='absolute flex items-center justify-center top-56 bg-neutral-800 w-28 h-28 rounded-full'>
          <span>{currentWord}</span>
        </div>
      }

      <div className='flex justify-around items-center w-full h-full'>
        <Player
          name={playerData.player1.name}
          lifePoints={playerData.player1.lifePoints}
          word={playerData.player1.attack}
        />

        <Player
          name={playerData.player2.name}
          lifePoints={playerData.player2.lifePoints}
          word={playerData.player2.attack}
        />

      </div>
      <div className='bg-sky-950 p-5 w-full rounded-2xl'>
        <BattleText currentWord={currentWord} isPlayer1={isPlayer1} />
      </div>
    </div>
  )
}
