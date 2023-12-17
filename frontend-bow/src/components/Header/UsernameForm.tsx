import { SaveIcon, WriteIcon } from "../../assets/icons/Icons"
import { UsernameFormProps } from "../../types"

export function UsernameForm({
  inputUsernameRef,
  disabled,
  isVisible,
  formRoomData,
  handleChangeUsername,
  handleSubmitUsername,
}: UsernameFormProps) {
  return (
    <form
      className="flex items-center h-10 bg-sky-800 rounded-lg px-5 max-md:w-5/6 max-md:mt-2"
      onSubmit={handleSubmitUsername}
    >
      <label>
        Nombre:
        <input
          className="mx-5 bg-sky-800 border-none outline-none max-md:w-50"
          ref={inputUsernameRef}
          id="usernameID"
          type="text"
          disabled={disabled.input}
          value={formRoomData.username}
          onChange={handleChangeUsername}
        />
      </label>
      {isVisible && (
        <button>
          {disabled.input ? <WriteIcon /> : <SaveIcon />}
        </button>
      )}
    </form>
  )
}