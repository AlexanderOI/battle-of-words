import { GameRoom } from "../components/WordBattle/GameRoom";
import { Texting } from "../components/WordBattle/Texting";
import { Rules } from "../components/WordBattle/Rules";

export function WordBattle() {
  return (
    <div className="flex h-full relative">
      <Rules />
      <GameRoom />
      <Texting />
    </div>
  )
}