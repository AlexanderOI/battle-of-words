import { useState } from "react"
import { SendIcon } from "../../assets/icons/Icons"
import { usePlayerContext } from "../../context/PlayerDataContext"
import { useSocket } from "../../context/SocketContext"
import { useRoomCodeContext } from "../../context/RoomCodeContext"

export function BattleText({ currentWord, isPlayer1 }: { currentWord: string, isPlayer1: boolean }) {
  const socket = useSocket()

  const { roomCode } = useRoomCodeContext()
  const { setPlayerData } = usePlayerContext()

  const [attackWord, setAttackWord] = useState('')

  const handleChangeAttackWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setAttackWord(value)
    setPlayerData(prev => {
      const { player1, player2 } = prev
      console.log(player1, player2)

      const newData = isPlayer1
        ? {
          player1: { ...player1, attack: value },
          player2: { ...player2 }
        }
        : {
          player1: { ...player1 },
          player2: { ...player2, attack: value }
        }


      socket.emit('attackWrite', roomCode, newData)
      return newData
    })
  }

  const handleSubmitAttackWord = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    socket.emit('attack', roomCode, currentWord, attackWord)
  }

  return (
    <>
      {isPlayer1 ?
        <form className="flex justify-center items-center bg-neutral-500 rounded-2xl"
          onSubmit={handleSubmitAttackWord}
        >
          <input
            className="text-center text-xl w-full h-11 outline-none bg-neutral-500 text-black p-2 rounded-2xl placeholder-gray-900"
            aria-label="Envia tu ataque de texto"
            type="text"
            onChange={handleChangeAttackWord}
            value={attackWord}
          />
          <button aria-label="Enviar">
            <SendIcon />
          </button>
        </form>
        :
        <div className="w-full h-11">

        </div>
      }
    </>
  )
}
