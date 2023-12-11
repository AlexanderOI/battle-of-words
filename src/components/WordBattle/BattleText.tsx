import { useState } from "react"
import { SendIcon } from "../../assets/icons/Icons"

export function BattleText() {
  const [attackWord] = useState({
    player1: '',
    player2: ''
  })

  const handleChangeAttackWord = (event: React.FormEvent<HTMLInputElement>) => {

  }

  return (
    <form className="flex justify-center items-center bg-neutral-500 rounded-2xl">
      <input
        className="text-center text-xl w-full h-11 outline-none bg-neutral-500 text-black p-2 rounded-2xl placeholder-gray-900"
        aria-label="Envia tu ataque de texto"
        type="text"
        onChange={handleChangeAttackWord}
        value={attackWord.player1}
      />
      <button aria-label="Enviar">
        <SendIcon />
      </button>
    </form>
  )
}
