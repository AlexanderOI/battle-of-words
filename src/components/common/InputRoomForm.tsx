import { useState } from "react"
import { ConfirmIcon, CopyIcon } from "../../assets/icons/Icons"
import { InputRoomFormProps } from "../../types"


export function InputRoomForm({ label, name, type, placeholder, value, onChange, disabled }: InputRoomFormProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value ?? '')
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 3000)
  }

  return (
    <label className="relative flex justify-between items-center">
      {label}:
      <input
        className={`m-2 px-2 py-2 ${type === "text" ? 'bg-sky-200' : 'bg-sky-600'} border-none outline-none w-3/4 text-black rounded-md ${type === "text" ? 'placeholder-gray-500' : 'placeholder-gray-300'}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {
        label === 'Código' &&
        <button
          className="absolute right-3"
          onClick={handleCopyClick}
          disabled={isCopied}>
          {isCopied ? <ConfirmIcon /> : <CopyIcon />}
        </button>
      }
    </label>
  )
}
