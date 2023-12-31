import { FaceIcon } from "../../assets/icons/Icons"

type PlayerProps = {
  name: string
  lifePoints: number
  word: string
}

export function Player({ name, lifePoints, word }: PlayerProps) {
  const lifePercentage = (lifePoints / 300) * 100

  const color = `rgb(${255 - lifePercentage * 2.55}, 0, 0)`;

  return (
    <div className="flex flex-col items-center w-[200px]">
      <FaceIcon color={color} />
      <div>{name}</div>
      <div className="relative w-full h-5 bg-slate-100 rounded-md mt-2 overflow-hidden">
        <span
          className="absolute w-full h-full text-center leading-tight"
          style={{ color: color }}
        >
          {lifePoints}
        </span>
        <div
          className="flex justify-center items-center h-full bg-green-600 text-sky-900"
          style={{ width: `${lifePercentage}%` }}
        >
        </div>
      </div>
      <span className='h-5'>{word}</span>
    </div>
  )
}