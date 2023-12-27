import { FaceIcon } from "../../assets/icons/Icons"

type PlayerProps = {
  name: string
  lifePoints: number
  word: string
}

export function Player({ name, lifePoints, word }: PlayerProps) {
  const lifePercentage = (lifePoints / 300) * 100

  return (
    <div className="flex flex-col items-center w-[200px]">
      <FaceIcon />
      <div>{name}</div>
      <div className="w-full h-5 bg-slate-100 rounded-md mt-2 overflow-hidden">
        <div
          className="h-full bg-green-600"
          style={{ width: `${lifePercentage}%` }}
        ></div>
      </div>
      <span className='h-5'>{word}</span>
    </div>
  )
}