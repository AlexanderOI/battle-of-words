import { FaceIcon } from '../../assets/icons/Icons'
import { BattleText } from './BattleText';

export function GameRoom() {
  const jugador1Vida = 80
  const jugador2Vida = 60

  return (
    <div className="flex flex-col justify-around items-center w-3/4 m-5 h-full max-md:w-full max-md:m-0">
      <div className='flex justify-around items-center w-full h-full'>
        <div className="flex flex-col items-center w-[200px]">
          <FaceIcon />
          <div>Jugador 1</div>
          <div className="w-full h-5 bg-slate-100 rounded-md mt-2 overflow-hidden">
            <div
              className="h-full bg-green-600"
              style={{ width: `${jugador1Vida}%` }}
            ></div>
            <span className='h-5'></span>
          </div>
        </div>

        <div className="flex flex-col items-center w-[200px]">
          <FaceIcon />
          <div>Jugador 2</div>
          <div className="w-full h-5 bg-slate-100 rounded-md mt-2 overflow-hidden">
            <div
              className="h-full bg-green-600"
              style={{ width: `${jugador2Vida}%` }}
            ></div>
          </div>
          <span className='h-5'></span>
        </div>
      </div>

      <div className='bg-sky-950 p-5 w-full rounded-2xl'>
        <BattleText />
      </div>
    </div>
  );
}
