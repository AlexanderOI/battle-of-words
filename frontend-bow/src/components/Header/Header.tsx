import React, { useEffect, useRef, useState } from "react"
import { GitHubIcon, LinkedinIcon } from "../../assets/icons/Icons"
import { useRoomContext } from "../../context/RoomDataContext"
import { useNavigate } from "react-router-dom"
import { useSocket } from "../../context/SocketContext"
import { UsernameForm } from "./UsernameForm"
import { RoomForm } from "./RoomForm"
import { useRoomCodeContext } from "../../context/RoomCodeContext"

export function Header() {
  const navigate = useNavigate()
  const socket = useSocket()
  const { formRoomData, setFormRoomData } = useRoomContext()
  const { setRoomCode } = useRoomCodeContext()

  const inputUsernameRef = useRef<HTMLInputElement | null>(null)

  const [enterCode, setEnterCode] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const [isAlertShown, setIsAlertShown] = useState(false)
  const [disabled, setDisabled] = useState({
    input: true,
    button: true,
  })
  const [player, setPlayer] = useState({
    name: '',
    lifePoints: 300,
    attack: '',
    defense: ''
  })

  const isRoom = window.location.pathname

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormRoomData((prev) => ({
      ...prev,
      username: event.target.value,
    }))
  }

  const handleChangeJoinRoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setIsAlertShown(false)
    if (value.length > 5) {
      setDisabled((prev) => ({ ...prev, button: false }))
    } else {
      setDisabled((prev) => ({ ...prev, button: true }))
    }

    if (value.length > 6) return
    setEnterCode(value)
  }

  const handleSubmitEnterCode = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRoomCode(enterCode)
    socket.emit("joinRoom", enterCode, player)
  }

  const handleSubmitUsername = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabled((prev) => ({
      ...prev,
      input: !prev.input,
    }))
    localStorage.setItem("username", JSON.stringify(formRoomData.username))
  }

  useEffect(() => {
    try {
      const usernameSaved = JSON.parse(localStorage.getItem("username") ?? "")
      if (usernameSaved) {
        setFormRoomData((prev) => ({
          ...prev,
          username: usernameSaved,
        }))
        setPlayer((prev) => ({
          ...prev,
          name: usernameSaved,
        }))
      }
    } catch (error) {
      setFormRoomData((prev) => ({
        ...prev,
        username: "username",
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
    if (inputUsernameRef.current && !disabled.input) {
      inputUsernameRef.current.focus()
    }
  }, [disabled.input])

  useEffect(() => {
    setPlayer((prev) => ({
      ...prev,
      name: formRoomData.username,
    }))
  }, [formRoomData.username])

  socket.on("joinRoomError", (data: { error: string }) => {
    const { error } = data
    if (error === 'La sala no existe') {
      setIsAlertShown(true)
    } else {
      navigate(`/room/${enterCode}`)
      setIsVisible(false)
    }
  })

  return (
    <header className="bg-sky-950 flex h-20 w-full items-center justify-between px-5 max-md:flex-col max-md:h-36 max-md:justify-normal">
      <div className="flex items-center max-md:flex-col max-md:mt-2">
        <h1 className="mx-5 text-3xl text-green-500 font-bold">Battle of Words</h1>
        <UsernameForm
          inputUsernameRef={inputUsernameRef}
          disabled={disabled}
          isVisible={isVisible}
          formRoomData={formRoomData}
          handleChangeUsername={handleChangeUsername}
          handleSubmitUsername={handleSubmitUsername}
        />
        <RoomForm
          isAlertShown={isAlertShown}
          isVisible={isVisible}
          enterCode={enterCode}
          handleChangeJoinRoom={handleChangeJoinRoom}
          handleSubmitEnterCode={handleSubmitEnterCode}
          disabled={disabled}
        />
      </div>
      <div className="flex w-24 justify-between max-md:mt-2">
        <a href="https://www.linkedin.com/in/alexander-o-18a7a1248" target="_blank">
          <LinkedinIcon />
        </a>
        <a href="https://github.com/AlexanderOI" target="_blank">
          <GitHubIcon />
        </a>
      </div>
    </header>
  )
}
