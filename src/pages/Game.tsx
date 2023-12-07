import { useState } from "react"
import { FormRoom } from "../components/game/FormRoom"
import { Modes } from "../components/game/Modes"
import { Rules } from "../components/game/Rules"
import { FormRoomData } from "../types"
import { codeGenerator } from "../utils/codeGenerator"
import { useNavigate } from "react-router-dom"


export function Game() {
  const navigate = useNavigate()

  const [formRoomData, setFormRoomData] = useState<FormRoomData>({
    roomname: '',
    code: '',
    gamemode: '',
    roomtype: 'public'
  })

  const handleClickCreateRoom = () => {
    const newCode = codeGenerator()
    setFormRoomData(prev => ({
      ...prev,
      code: newCode
    }))
  }

  const handleClickPlay = () => {
    navigate(`/room/${formRoomData.code}`)
  }

  return (
    <main className="flex max-md:flex-col">
      <div className="bg-sky-950 w-4/6 m-5 p-5 rounded-2xl max-md:w-full max-md:m-0">
        <Modes
          setFormRoomData={setFormRoomData}
        />
        <FormRoom
          formRoomData={formRoomData}
          setFormRoomData={setFormRoomData}
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