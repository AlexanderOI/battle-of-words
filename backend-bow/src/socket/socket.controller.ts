import { Server } from "socket.io"

interface Room {
  players: { [socketId: string]: PlayerData }
}

interface PlayerData {
  name: string
  lifePoints: number
  attack: string
}

interface Rooms {
  [key: string]: Room
}

const rooms: Rooms = {}

export const gameController = (io: Server): void => {
  io.on('connection', (socket) => {
    console.log('a user has connected')

    socket.on('createRoom', (roomCode: string, playerData: PlayerData) => {
      rooms[roomCode] = { players: { [socket.id]: playerData } }
      socket.join(roomCode)

      // io.to(roomCode).emit('updatePlayers', rooms[roomCode].players)

      console.log(rooms)
    })

    socket.on('joinRoom', (roomCode: string, playerData: PlayerData) => {
      if (rooms[roomCode]) {
        rooms[roomCode].players[socket.id] = playerData
        socket.join(roomCode)

        // io.to(roomCode).emit('updatePlayers', rooms[roomCode].players)
        socket.emit('joinRoomError', { error: 'La sala existe' })

        io.to(roomCode).emit('sendSocketId', socket.id)
      } else {
        socket.emit('joinRoomError', { error: 'La sala no existe' })
      }


      console.log(rooms)
    })

    socket.on('attack', (dataPlayer: PlayerData) => {
      const roomCode = Object.keys(socket.rooms)[1]

      if (rooms[roomCode] && rooms[roomCode].players[socket.id]) {
        rooms[roomCode].players[socket.id] = dataPlayer
        io.to(roomCode).emit('updatePlayers', rooms[roomCode].players)
      }
    })

  })
}
