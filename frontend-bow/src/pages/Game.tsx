import { FormRoom } from "../components/game/FormRoom"
import { Modes } from "../components/game/Modes"
import { Rules } from "../components/game/Rules"
import { codeGenerator } from "../utils/codeGenerator"
import { useNavigate } from "react-router-dom"
import { useRoomContext } from "../context/RoomDataContext"
import { useSocket } from "../context/SocketContext"
import { useEffect, useState } from "react"
import { usePlayerContext } from "../context/PlayerDataContext"

export function Game() {
  const navigate = useNavigate()

  const socket = useSocket()
  const { setPlayerData } = usePlayerContext()
  const { formRoomData, setFormRoomData } = useRoomContext()

  const [player, setPlayer] = useState({
    name: '',
    lifePoints: 300,
    attack: '',
  })

  const handleClickCreateRoom = () => {
    const newCode = codeGenerator()
    setFormRoomData(prev => ({
      ...prev,
      code: newCode
    }))

    setPlayerData(prev => ({
      ...prev,
      ['player1']: player
    }))

    socket.emit('createRoom', newCode, player)
  }

  const handleClickPlay = () => {
    navigate(`/room/${formRoomData.code}`)
  }

  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      name: formRoomData.username,
    }))
  }, [formRoomData.username])


  return (
    <main className="flex max-md:flex-col h-[710px] max-md:h-ful">
      <div className="bg-sky-950 w-4/6 m-5 p-5 rounded-2xl l max-md:w-full max-md:m-0">
        <Modes />
        <FormRoom
          handleClickCreateRoom={handleClickCreateRoom}
          handleClickPlay={handleClickPlay}
        />
      </div>
      <div className="bg-sky-950 w-full m-5 p-5 rounded-2xl max-md:m-0 max-md:my-5">
        <Rules />
      </div>
    </main>
  )
}