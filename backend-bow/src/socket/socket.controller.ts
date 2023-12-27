import util from 'node:util'

import { Server } from "socket.io"
import { ReadJSON } from '../utils/readJSON'
import { prisma } from '../service/db'
import { generateRandomWord } from '../utils/randomWord'

interface Room {
  players: { [socketId: string]: Player }
}

interface Player {
  name: string
  lifePoints: number
  attack: string
}

interface Rooms {
  [key: string]: Room
}

interface PlayerData {
  player1: Player
  player2: Player
}

const rooms: Rooms = {}

export const gameController = async (io: Server): Promise<void> => {
  const wordFragmentsFilePath = 'src/json/wordFragments.json'
  const wordFragments = await ReadJSON(wordFragmentsFilePath)

  io.on('connection', async (socket) => {
    console.log('a user has connected')

    socket.on('createRoom', (roomCode: string, playerData: Player) => {
      rooms[roomCode] = { players: { [socket.id]: playerData } }
      socket.join(roomCode)

      io.to(roomCode).emit('dataPlayers', rooms[roomCode].players)

      console.log(util.inspect(rooms, { depth: null }))
    })

    socket.on('joinRoom', (roomCode: string, playerData: Player) => {
      if (rooms[roomCode]) {
        rooms[roomCode].players[socket.id] = playerData
        socket.join(roomCode)

        socket.emit('joinRoomError', { error: 'La sala existe' })

        io.to(roomCode).emit('sendSocketId', socket.id)
        io.to(roomCode).emit('dataPlayers', rooms[roomCode].players)

      } else {
        socket.emit('joinRoomError', { error: 'La sala no existe' })
      }

      console.log(util.inspect(rooms, { depth: null }))
    })

    socket.on('startGame', (roomCode: string, start: boolean) => {
      const randomWord = generateRandomWord(wordFragments)

      io.to(roomCode).emit('setCurrentWord', randomWord)
      io.to(roomCode).emit('startGame', start)
    })

    socket.on('attackWrite', (roomCode: string, playerData: PlayerData) => {
      io.to(roomCode).emit('wordWrite', playerData)
    })

    socket.on('attack', async (roomCode: string, currentWord: string, attackWord: string) => {
      const wordFragmentExist = attackWord.includes(currentWord)
      console.log(wordFragmentExist)


      const updatePlayerLifePoints = async (playerId: string, points: number) => {
        const playerData = rooms[roomCode].players[playerId]
        const newPlayerData = { ...playerData, lifePoints: playerData.lifePoints - points }
        rooms[roomCode].players[playerId] = newPlayerData
      }

      if (wordFragmentExist) {
        const wordExist = await prisma.words.findUnique({
          where: {
            word: attackWord,
          },
        })

        if (wordExist) {
          for (const key in rooms[roomCode].players) {
            if (key !== socket.id) {
              await updatePlayerLifePoints(key, attackWord.length)
            }
          }
        } else {
          await updatePlayerLifePoints(socket.id, 5)
        }
      } else {
        await updatePlayerLifePoints(socket.id, 5)
      }

      const randomWord = generateRandomWord(wordFragments)

      io.to(roomCode).emit('setCurrentWord', randomWord)
      io.to(roomCode).emit('sendSocketId', socket.id)
      io.to(roomCode).emit('dataPlayers', rooms[roomCode].players)
    })
  })

}
