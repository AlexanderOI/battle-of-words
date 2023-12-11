//types Game page
export type FormRoomData = {
  username: string
  roomname: string
  code: string
  gamemode: string
  roomtype: string
}

export type FormRoom = {
  handleClickCreateRoom: () => void
  handleClickPlay: () => void
}


//types WordBattle page
export type Player = {
  name: string
  lifePoints: number
  gameTurn: boolean
  attack: string
}

export type PayerData = {
  player1: Player
  player2: Player
}


//type InputRoomForm component
export type InputRoomFormProps = {
  label: string
  name: string
  type?: "text" | "number" | "email"
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  defaultValue?: string
}

//type GameModeList component
export type GameModeListProps = {
  gameMode: GameMode
  active: number
  handleClickGameMode: (index: number, name: string) => void
}

//Contants
export type GameMode = {
  name: string
  image: string
}[]

export type RulesData = {
  title: string;
  description: string;
}[]
