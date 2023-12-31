import { useState } from "react"
import { SendIcon, ShieldIcon, SwordIcon } from "../../assets/icons/Icons"
import { usePlayerContext } from "../../context/PlayerDataContext"
import { useSocket } from "../../context/SocketContext"
import { useRoomCodeContext } from "../../context/RoomCodeContext"

export function BattleText({ currentWord, isPlayer1 }: { currentWord: string, isPlayer1: boolean }) {
  const socket = useSocket()

  const { roomCode } = useRoomCodeContext()
  const { setPlayerData } = usePlayerContext()

  const [word, setWord] = useState('')

  const handleChangeAttackWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setWord(value)
    setPlayerData(prev => {
      const { player1, player2 } = prev

      const usernameSaved = JSON.parse(localStorage.getItem("username") ?? "")
      const isPlayer1Turn = player1.name === usernameSaved

      const newData = isPlayer1
        ? {
          player1: isPlayer1Turn ? { ...player1, attack: value } : { ...player1 },
          player2: isPlayer1Turn ? { ...player2 } : { ...player2, attack: value }
        }
        : {
          player1: isPlayer1Turn ? { ...player1, defense: value } : { ...player1 },
          player2: isPlayer1Turn ? { ...player2 } : { ...player2, defense: value }
        }

      const emitEvent = isPlayer1 ? 'attackWrite' : 'defenseWord'
      socket.emit(emitEvent, roomCode, newData)

      return newData
    })
  }

  const handleSubmitAttackWord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const emitEvent = isPlayer1 ? 'attack' : 'defense'
    socket.emit(emitEvent, roomCode, currentWord, word)
    setWord('')
  }

  return (
    <>
      <form className="flex justify-center items-center bg-neutral-500 rounded-2xl"
        onSubmit={handleSubmitAttackWord}
      >
        {isPlayer1 ? <SwordIcon /> : <ShieldIcon />}
        <input
          className="text-center text-xl w-full h-11 outline-none bg-neutral-500 text-black p-2 rounded-2xl placeholder-gray-900"
          aria-label="Envia tu ataque de texto"
          type="text"
          onChange={handleChangeAttackWord}
          value={word}
        />
        <button aria-label="Enviar">
          <SendIcon />
        </button>
      </form>
    </>
  )
}
