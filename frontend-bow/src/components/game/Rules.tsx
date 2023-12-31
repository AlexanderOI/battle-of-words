import { rulesData } from '../../constants/GameRules'
import { useRoomContext } from '../../context/RoomDataContext'
import { Rule } from '../common/Rule'

export function Rules() {
  const { formRoomData } = useRoomContext()
  return (
    <section className="pl-6 rounded-lg ">
      <h2 className="text-center text-3xl mb-4 font-bold text-indigo-400">Reglas del Juego</h2>
      {
        formRoomData.gamemode === 'Word Battle' ?
          <div className='overflow-y-auto h-[580px] max-md:h-full'>
            {rulesData.map((rule, index) => (
              <Rule key={index} title={rule.title} description={rule.description} />
            ))}
          </div>
          :
          <div className='w-full'>
            <p className='text-indigo-500 font-bold text-center'>Aqui apareceran las reglas luego🙂</p>
          </div>
      }
    </section>
  )
}

