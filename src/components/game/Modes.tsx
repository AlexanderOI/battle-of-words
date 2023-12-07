import { useState } from "react"
import { gameMode } from "../../constants/GameModes"
import { GameModeList } from "../common/GameModeList"
import { useRoomContext } from "../../context/RoomDataContext"

export function Modes() {
  const { setFormRoomData } = useRoomContext()

  const [active, setActive] = useState<number>(-1)

  const handleClickGameMode = (index: number, name: string) => {
    const newGamemode = name === 'Proximamente...' ? 'Este modo no esta disponible' : name
    setActive(index)
    setFormRoomData(prev => ({
      ...prev,
      gamemode: newGamemode
    }))
  }

  return (
    <section>
      <h2 className="text-center text-3xl mb-5 font-bold text-indigo-400">Modos de juego</h2>
      <GameModeList
        gameMode={gameMode}
        active={active}
        handleClickGameMode={handleClickGameMode}
      />
    </section>
  )
}
