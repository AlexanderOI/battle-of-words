import { FormRoom } from "../components/game/FormRoom";
import { Modes } from "../components/game/Modes";
import { Rules } from "../components/game/Rules";

export function Game() {

  return (
    <main className="flex max-md:flex-col">
      <div className="bg-sky-950 w-4/6 m-5 p-5 max-md:w-full max-md:m-0">
        <Modes />
        <FormRoom />
      </div>
      <div className="bg-sky-950 w-full m-5 p-5 max-md:m-0 max-md:my-5">
        <Rules />
      </div>
    </main>
  )
}