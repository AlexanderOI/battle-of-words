import { PersonIcon, SendIcon } from "../../assets/icons/Icons";

export function Texting() {
  return (
    <div className="flex flex-col bg-sky-950 w-1/4 m-5 p-5 h-full max-md:w-full max-md:m-0 rounded-2xl">
      <h2 className="text-center text-xl mb-5">Chat</h2>
      <div className="flex flex-col w-full h-full bg-neutral-800 mb-3 p-5 rounded-2xl overflow-y-auto">
        <div className="flex items-start mb-3">
          <PersonIcon />
          <span className="break-words whitespace-pre-wrap">
            <strong>Jugador 1:</strong> holos
          </span>
        </div>

        <div className="flex items-start mb-3">
          <PersonIcon />
          <span className="break-words whitespace-pre-wrap">
            <strong>Jugador 2:</strong> holos x2
          </span>
        </div>

        <div className="flex items-start mb-3">
          <PersonIcon />
          <span className="break-words whitespace-pre-wrap">
            <strong>Jugador 3:</strong> holos x3 al cuadrado
          </span>
        </div>

        <div className="flex items-start mb-3">
          <PersonIcon />
          <span className="break-words whitespace-pre-wrap w-11/12">
            <strong>Jugador 4:</strong> holos x3 al cuadrado pero derivando
          </span>
        </div>
      </div>
      <form className="flex justify-center items-center bg-neutral-500 rounded-2xl">
        <input
          className="w-full h-11 outline-none bg-neutral-500 text-black p-2 rounded-2xl placeholder-gray-900"
          aria-label="Escribe tu mensaje"
          placeholder="Escribe tu mensaje"
          type="text"
        />
        <button aria-label="Enviar">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
