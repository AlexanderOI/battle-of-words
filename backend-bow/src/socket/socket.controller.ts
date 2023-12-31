import util from 'node:util'

import { Server } from "socket.io"
import { ReadJSON } from '../utils/readJSON'
import { prisma } from '../service/db'
import { generateRandomWord } from '../utils/randomWord'

interface Room {
  players: { [socketId: string]: Player }
  lastLetter?: string

}

interface Player {
  name: string
  lifePoints: number
  attack: string
  defense: string
}

interface PlayerData {
  player1: Player
  player2: Player
}
interface Rooms {
  [key: string]: Room
}

const rooms: Rooms = {}

export const gameController = async (io: Server): Promise<void> => {
  const wordFragmentsFilePath = 'src/json/wordFragments.json'
  const wordFragments = await ReadJSON(wordFragmentsFilePath)

  io.on('connection', async (socket) => {
    console.log('a user has connected')

    const updatePlayerLifePoints = async (playerId: string, roomCode: string, points: number, currentWord: string, attackWord: string = '') => {
      const { defense } = rooms[roomCode].players[playerId]

      let damage: number = points !== 20
        ? points > 8 ? Math.round(((points / 100) * 20)) * 2 : points * 2
        : points

      if (defense.includes(currentWord)) {
        damage = Math.round(damage / 2)
      }

      const playerData = rooms[roomCode].players[playerId]
      const newPlayerData = { ...playerData, lifePoints: playerData.lifePoints - damage, attack: attackWord }
      rooms[roomCode].players[playerId] = newPlayerData

      if (attackWord.startsWith(rooms[roomCode].lastLetter ?? '-')) {
        const playerData = rooms[roomCode].players[socket.id]
        const newPlayerData = { ...playerData, lifePoints: playerData.lifePoints + 5 }
        rooms[roomCode].players[socket.id] = newPlayerData
      }

      if (attackWord) {
        rooms[roomCode].lastLetter = attackWord.split('')[0]
      }
    }

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

    socket.on('defenseWord', (roomCode: string, playerData: PlayerData) => {
      io.to(roomCode).emit('wordWrite', playerData)
    })

    socket.on('attack', async (roomCode: string, currentWord: string, attackWord: string) => {
      const wordFragmentExist = attackWord.includes(currentWord)

      if (wordFragmentExist) {
        const wordExist = await prisma.words.findUnique({
          where: {
            word: attackWord,
          },
        })

        if (wordExist) {
          for (const key in rooms[roomCode].players) {
            if (key !== socket.id) {
              await updatePlayerLifePoints(key, roomCode, attackWord.length, currentWord)
              await updatePlayerLifePoints(socket.id, roomCode, 0, attackWord, currentWord)
            }
          }
        } else {
          await updatePlayerLifePoints(socket.id, roomCode, 20, attackWord, currentWord)
        }
      } else {
        await updatePlayerLifePoints(socket.id, roomCode, 20, attackWord, currentWord)
      }

      const randomWord = generateRandomWord(wordFragments)

      io.to(roomCode).emit('setCurrentWord', randomWord)
      io.to(roomCode).emit('sendSocketId', socket.id)
      io.to(roomCode).emit('dataPlayers', rooms[roomCode].players)
    })

    socket.on('defense', async (roomCode: string, currentWord: string, defenseWord: string) => {
      const wordFragmentExist = defenseWord.includes(currentWord)

      if (wordFragmentExist) {
        const wordExist = await prisma.words.findUnique({
          where: {
            word: defenseWord,
          },
        })

        if (wordExist) {
          rooms[roomCode].players[socket.id].defense = defenseWord
        }
      }
    })
  })

}
