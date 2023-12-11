import { useEffect, useState } from "react"
import { GitHubIcon, LinkedinIcon, SaveIcon, WriteIcon } from "../../assets/icons/Icons"
import { useRoomContext } from "../../context/RoomDataContext"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()
  const { formRoomData, setFormRoomData } = useRoomContext()

  const [enterCode, setEnterCode] = useState('')
  const [isVisible, setIsVisible] = useState(true)
  const [disabled, setDisabled] = useState({
    input: true,
    button: true
  })

  const isRoom = window.location.pathname

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormRoomData(prev => ({
      ...prev,
      username: event.target.value
    }))
  }

  const handleChangeJoinRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    console.log(value)

    if (value.length > 5) {
      setDisabled(prev => ({ ...prev, button: false }))
    } else {
      setDisabled(prev => ({ ...prev, button: true }))
    }

    if (value.length > 6) return
    setEnterCode(value)
  }

  const handleSubmitEnterCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsVisible(false)
    navigate(`/room/${enterCode}`)
  }

  const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabled(prev => ({
      ...prev,
      input: !prev.input
    }))
    localStorage.setItem('username', JSON.stringify(formRoomData.username))
  }

  useEffect(() => {
    try {
      const usernameSaved = JSON.parse(localStorage.getItem('username') ?? '')
      if (usernameSaved) {
        setFormRoomData(prev => ({
          ...prev,
          username: usernameSaved
        }))
      }
    } catch (error) {
      setFormRoomData(prev => ({
        ...prev,
        username: 'username'
      }))
    }
  }, [])

  useEffect(() => {
    if (isRoom.length > 2) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
  }, [isRoom])

  useEffect(() => {
    const inputUsername = document.getElementById("usernameID")
    if (inputUsername && !disabled.input) {
      inputUsername.focus()
    }
  }, [disabled.input])

  return (
    <header className="bg-sky-950 flex h-20 w-full items-center justify-between px-5 max-md:flex-col max-md:h-36 max-md:justify-normal" >
      <div className="flex items-center max-md:flex-col max-md:mt-2">
        <h1 className="mx-5 text-3xl text-green-500 font-bold">Battle of Words</h1>
        <form
          className=" flex items-center h-10 bg-sky-800 rounded-lg px-5 max-md:w-5/6 max-md:mt-2"
          onSubmit={handleSubmitUsername}
        >
          <label>Nombre:
            <input
              className="mx-5 bg-sky-800 border-none outline-none max-md:w-50"
              id="usernameID"
              type="text"
              disabled={disabled.input}
              value={formRoomData.username}
              onChange={handleChangeUsername}
            />
          </label>
          {
            isVisible &&
            <button>
              {disabled.input ? <WriteIcon /> : <SaveIcon />}
            </button>
          }
        </form>
        {
          isVisible &&
          <form
            className="flex items-center h-10 bg-green-500 rounded-lg mx-4 px-5 max-md:m-0 max-md:w-5/6 max-md:mt-2"
            onSubmit={handleSubmitEnterCode}
          >
            <label>Ingresar en una sala
              <input type="text"
                className="mx-5 bg-gray-300 border-none outline-none w-24 text-black px-2 rounded-md"
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
        }
      </div>
      <div className="flex w-24 justify-between max-md:mt-2">
        <a href="https://www.linkedin.com/in/alexander-o-18a7a1248" target="_blank"><LinkedinIcon /></a>
        <a href="https://github.com/AlexanderOI" target="_blank"><GitHubIcon /></a>
      </div>
    </header>
  )
}