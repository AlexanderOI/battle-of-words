import { useState } from "react"
import { gameMode } from "../../constants/GameModes"
import { SetFormRoomData } from "../../types"
import { GameModeList } from "../common/GameModeList"

export function Modes({ setFormRoomData }: SetFormRoomData) {
  const [active, setActive] = useState<number>(-1)

  const handleClickGameMode = (index: number, name: string) => {
    setActive(index)
    setFormRoomData(prev => ({
      ...prev,
      gamemode: name
    }))
  }

  return (
    <section>
      <h2 className="text-center text-xl mb-5">Modos de juego</h2>
      <GameModeList
        gameMode={gameMode}
        active={active}
        handleClickGameMode={handleClickGameMode}
      />
    </section>
  )
}
