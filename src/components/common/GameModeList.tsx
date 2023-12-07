import { GameModeListProps } from "../../types"

export function GameModeList({ gameMode, active, handleClickGameMode }: GameModeListProps) {
  return (
    <ul className=" overflow-x-auto whitespace-nowrap">
      {gameMode.map((game, index) => (
        <li
          key={index}
          className={
            `${active === index ? 'bg-slate-600' : 'bg-sky-900'} 
              ${index === 0 ? 'ml-5' : ''} 
              inline-block w-52 items-center my-5 mr-5 rounded-2xl max-md:w-40 cursor-pointer`
          }
          onClick={() => handleClickGameMode(index, game.name)}
        >
          <span className="flex justify-center m-2 text-xl">{game.name}</span>
          <img className="w-52" src={game.image} alt="logo de battle of Word" />
        </li>
      ))}
    </ul>
  )
}