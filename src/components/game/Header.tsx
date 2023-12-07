import { useEffect, useState } from "react"
import { GitHubIcon, LinkedinIcon, SaveIcon, WriteIcon } from "../../assets/icons/Icons"
import { useRoomContext } from "../../context/RoomDataContext"

export function Header() {
  const { formRoomData, setFormRoomData } = useRoomContext()

  const [inputDisabled, setInputDisabled] = useState(true)

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormRoomData(prev => ({
      ...prev,
      username: event.target.value
    }))
  }

  const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setInputDisabled(prev => !prev)
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
        username: 'usernameSaved'
      }))

    }
  }, [])


  useEffect(() => {
    const inputUsername = document.getElementById("usernameID")
    if (inputUsername && !inputDisabled) {
      inputUsername.focus()
    }
  }, [inputDisabled])

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
              className="mx-5 bg-sky-800 border-none outline-none max-md:w-60"
              id="usernameID"
              type="text"
              disabled={inputDisabled}
              value={formRoomData.username}
              onChange={handleChangeUsername}
            />
          </label>
          <button>
            {inputDisabled ? <WriteIcon /> : <SaveIcon />}
          </button>
        </form>
      </div>
      <div className="flex w-24 justify-between max-md:mt-2">
        <a href="https://www.linkedin.com/in/alexander-o-18a7a1248" target="_blank"><LinkedinIcon /></a>
        <a href="https://github.com/AlexanderOI" target="_blank"><GitHubIcon /></a>
      </div>
    </header>
  )
}