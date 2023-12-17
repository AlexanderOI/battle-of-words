import { useEffect, useState } from "react"

import { FormRoom } from '../../types'
import { InputRoomForm } from "../common/InputRoomForm"
import { useRoomContext } from "../../context/RoomDataContext"

export function FormRoom({ handleClickCreateRoom, handleClickPlay }: FormRoom) {
  const { formRoomData, setFormRoomData } = useRoomContext()

  const [isPublicActive, setIsPublicActive] = useState(true)
  const [isPlayActive, setisPlayActive] = useState(false)

  const handlePublicationButtonClick = (publication: string) => {
    setIsPublicActive(publication === 'public' ? true : false)
    setFormRoomData(prevData => ({ ...prevData, roomtype: publication }))
  }

  const handleChangeRoomname = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormRoomData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const { code, roomname, gamemode, roomtype, username } = formRoomData
    const notAvailable = 'Este modo no esta disponible'

    if (code && roomname && gamemode && gamemode != notAvailable && roomtype && username) {
      setisPlayActive(true)
    } else {
      setisPlayActive(false)

    }
  }, [formRoomData])

  return (
    <section>
      <h2 className="text-center text-3xl font-bold text-indigo-400 mt-3">Crea tu sala</h2>

      <div className="flex w-full max-md:flex-col">
        <div className="flex flex-col w-1/2 px-5 max-md:w-full my-3 max-md:p-0">
          <InputRoomForm
            label="Nombre"
            type="text"
            name="roomname"
            placeholder="Ingresar nombre de la sala"
            value={formRoomData.roomname}
            onChange={handleChangeRoomname}
          />

          <InputRoomForm
            label="Modo"
            name="gamemode"
            placeholder="Selecciona un modo de juego"
            disabled={true}
            value={formRoomData.gamemode}
          />

          <InputRoomForm
            label="Código"
            name="code"
            placeholder="Código generado automáticamente"
            disabled={true}
            value={formRoomData.code}
          />
        </div>

        <div className="flex flex-col justify-center text-center w-1/2 my-3 px-5 max-md:w-full max-md:p-0 ">
          <div className="flex justify-between w-full">
            <div className={`relative ${isPublicActive ? 'bg-green-500' : 'bg-blue-500'} w-1/2 rounded-md m-2`}>
              <button className="w-full h-full px-4 py-2" onClick={() => handlePublicationButtonClick('public')}>
                🌎 Público
              </button>
            </div>

            <div className={`relative ${!isPublicActive ? 'bg-green-500' : 'bg-blue-500'} w-1/2 rounded-md m-2`}>
              <button className="w-full h-full px-4 py-2" onClick={() => handlePublicationButtonClick('private')}>
                🔒 Privado
              </button>
            </div>
          </div>
          <button
            className="bg-green-500 px-4 py-2 rounded-md m-2 cursor-pointer"
            onClick={handleClickCreateRoom}
          >
            Crear sala
          </button>
          <button
            className={`${isPlayActive ? 'bg-blue-500 cursor-pointer' : 'bg-slate-600 cursor-default'} px-4 py-2 rounded-md m-2`}
            disabled={!isPlayActive}
            onClick={handleClickPlay}
          >
            Jugar
          </button>
        </div>
      </div>
    </section>
  )
}

