import { RoomFormProps } from "../../types"

export function RoomForm({
  isAlertShown,
  isVisible,
  enterCode,
  handleChangeJoinRoom,
  handleSubmitEnterCode,
  disabled,
}: RoomFormProps) {
  return (
    isVisible && (
      <form
        className="flex items-center h-10 bg-green-500 rounded-lg mx-4 px-5 max-md:m-0 max-md:w-5/6 max-md:mt-2"
        onSubmit={handleSubmitEnterCode}
      >
        <label>
          Ingresar en una sala
          <input
            type="text"
            className={`${isAlertShown ? 'outline-red-600' : 'outline-none'} mx-5 bg-gray-300 border-none outline-none w-24 text-black px-2 rounded-md`}
            name="EnterCode"
            placeholder="Código"
            spellCheck="false"
            value={enterCode}
            onChange={handleChangeJoinRoom}
          />
          <button
            className={`${disabled.button ? 'bg-neutral-500' : 'bg-blue-500'} py-[1px] px-2 rounded-md`}
            disabled={disabled.button}
          >
            Entrar
          </button>
        </label>
      </form>
    )
  )
}