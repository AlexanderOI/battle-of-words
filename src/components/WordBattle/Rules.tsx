import { useState } from "react"

export function Rules() {
  const [expandRules, setExpandRules] = useState("-19.4rem")

  const handleClickExpandRules = () => {
    setExpandRules((prev) => {
      const newValue = prev.length > 5 ? "0rem" : "-19.4rem"
      return newValue
    })
  }

  return (
    <section
      className={`flex justify-center items-center absolute h-full m-5 transition-transform ease-in-out duration-500`}
      style={{
        transform: `translateX(${expandRules})`,
        width: "20rem",
      }}
    >
      <div className="bg-neutral-800 p-5 h-full">
        <h2 className="text-center text-xl mb-5">Reglas del Juego</h2>
        <div>
          <p className="text-center">Aqui apareceran las reglas del juego</p>
        </div>
      </div>
      <div className="flex flex-col items-center bg-neutral-500 rounded-e-xl">
        <button
          className="p-3 pr-2 pl-0"
          onClick={handleClickExpandRules}
        >
          <span className="vertical-lr text-white whitespace-nowrap">
            Rules
          </span>
        </button>
      </div>
    </section>
  )
}
