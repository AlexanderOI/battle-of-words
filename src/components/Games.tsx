import battleWord from '../assets/img/battle-word.png'

export function Games() {
  return (
    <section className="bg-sky-950 w-4/6 m-5 p-5 max-md:w-full max-md:m-0">
      <h2 className="text-center text-xl mb-5">Modos de juego</h2>
      <ul className="border-2 border-neutral-500 rounded-2xl">
        <li className="bg-sky-900 flex flex-col w-60 items-center m-5 rounded-2xl max-md:w-40">
          <span className="flex text-center m-2 text-xl">Battle Word</span>
          <img className="w-60 max-md:w-40" src={battleWord} alt="logo de battle of Word" />
        </li>
      </ul>
    </section>
  )
}