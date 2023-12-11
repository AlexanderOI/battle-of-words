import { GameRoom } from "../components/WordBattle/GameRoom"
import { Chat } from "../components/WordBattle/Chat"
import { Rules } from "../components/WordBattle/Rules"
import { PlayerProvider } from "../context/PlayerDataContext"

export function WordBattle() {
  return (
    <PlayerProvider>
      <div className="flex h-full relative">
        <Rules />
        <GameRoom />
        <Chat />
      </div>
    </PlayerProvider>
  )
}