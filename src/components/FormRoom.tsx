export function FormRoom() {
  return (
    <section>
      <h2 className="text-center text-xl mt-5">Configúra tu sala</h2>

      <div className="flex w-full max-md:flex-col">
        <div className="flex flex-col w-1/2 px-5 max-md:w-full my-3 max-md:p-0">
          <label className="flex justify-between items-center">
            Nombre:
            <input
              className="m-2 px-2 py-2 bg-sky-200 border-none outline-none w-3/4 text-black rounded-md placeholder-gray-500"
              type="text"
              placeholder="Ingresar nombre de la sala"
            />
          </label>
          <label className="flex justify-between items-center">
            Código:
            <input
              className="m-2 px-2 py-2 bg-sky-600 border-none outline-none w-3/4 text-black rounded-md cursor-default placeholder-gray-300"
              type="text"
              placeholder="Código generado automáticamente"
            />
          </label>
          <label className="flex justify-between items-center" >
            Modo:
            <input
              className=" m-2 px-2 py-2 bg-sky-600 border-none outline-none w-3/4 text-black rounded-md cursor-default placeholder-gray-300"
              type="text"
              placeholder="Selecciona un modo de juego"
            />
          </label>
        </div>

        <div className="flex flex-col justify-center text-center w-1/2 my-3 px-5 max-md:w-full max-md:p-0 ">
          <div className="flex justify-between w-full">
            <button className="bg-green-500 w-1/2 px-4 py-2 rounded-md m-2 cursor-pointer">🌎 Publico</button>
            <button className="bg-blue-500 w-1/2 px-4 py-2 rounded-md m-2 cursor-pointer">🔒 Privado</button>
          </div>
          <button className="bg-green-500 px-4 py-2 rounded-md m-2 cursor-pointer">Crear sala</button>
          <button className="bg-blue-500 px-4 py-2 rounded-md m-2 cursor-pointer">Jugar</button>
        </div>
      </div>
    </section>
  )
}