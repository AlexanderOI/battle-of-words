import { GameRoom } from "../components/WordBattle/GameRoom"
import { Chat } from "../components/WordBattle/Chat"
import { Rules } from "../components/WordBattle/Rules"

export function WordBattle() {
  return (
    <div className="flex h-full relative">
      <Rules />
      <GameRoom />
      <Chat />
    </div>
  )
}