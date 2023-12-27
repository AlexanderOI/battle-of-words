import { useState } from "react"
import { Rule } from "../common/Rule"
import { rulesData } from "../../constants/GameRules"

export function Rules() {
  const [expandRules, setExpandRules] = useState("-24.4rem")

  const handleClickExpandRules = () => {
    setExpandRules((prev) => {
      const newValue = prev.length > 5 ? "0rem" : "-24.4rem"
      return newValue
    })
  }

  return (
    <section
      className={`flex justify-center items-center absolute h-full m-5 transition-transform ease-in-out duration-500 z-50`}
      style={{
        transform: `translateX(${expandRules})`,
        width: "25rem",
      }}
    >
      <div className="bg-sky-950 p-5 h-full rounded-2xl">
        <h2 className="text-center text-3xl mb-4 font-bold text-indigo-400">Reglas del Juego</h2>
        <div className="bg-neutral-800 p-5 overflow-y-auto h-[550px] rounded-2xl">
          {rulesData.map((rule, index) => (
            <Rule key={index} title={rule.title} description={rule.description} />
          ))}
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
