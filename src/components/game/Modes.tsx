import { useState } from "react";
import { gameModes } from "../../constants/GameModes";

export function Modes() {
  const [active, setActive] = useState<number>();

  return (
    <section>
      <h2 className="text-center text-xl mb-5">Modos de juego</h2>
      <ul className=" overflow-x-auto whitespace-nowrap">
        {gameModes.map((game, index) => (
          <li
            key={index}
            className={
              `${active === index ? 'bg-slate-600' : 'bg-sky-900'} 
              ${index === 0 ? 'ml-5' : ''} 
              inline-block w-52 items-center my-5 mr-5 rounded-2xl max-md:w-40 cursor-pointer`
            }
            onClick={() => setActive(index)}
          >
            <span className="flex justify-center m-2 text-xl">{game.name}</span>
            <img className="w-52" src={game.image} alt="logo de battle of Word" />
          </li>
        ))}
      </ul>
    </section>
  );
}
