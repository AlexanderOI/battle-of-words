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

//type UsernameForm component
export interface UsernameFormProps {
  inputUsernameRef: RefObject<HTMLInputElement | null>
  disabled: { input: boolean; button: boolean }
  isVisible: boolean
  formRoomData: { username: string }
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitUsername: (event: React.FormEvent<HTMLFormElement>) => void
}

//type RoomFor component
export interface RoomFormProps {
  isAlertShown: boolean
  isVisible: boolean
  enterCode: string
  handleChangeJoinRoom: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitEnterCode: (event: React.FormEvent<HTMLFormElement>) => void
  disabled: { button: boolean }
}

//Contants
export type GameMode = {
  name: string
  image: string
}[]

export type RulesData = {
  title: string
  description: string
}[]
