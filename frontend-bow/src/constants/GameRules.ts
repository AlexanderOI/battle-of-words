import { RulesData } from "../types"

export const rulesData: RulesData = [
  { title: "Puntos de Vida", description: "Cada jugador comienza con una cantidad determinada de puntos de vida." },
  { title: "Ataque", description: "Los jugadores realizan ataques escribiendo una palabra que contenga la sílaba indicada en su turno." },
  { title: "Bonificación por Longitud", description: "Si la palabra escrita tiene más de 8 caracteres, el ataque recibe un bono del 20%." },
  { title: "Daño por Letras Correctas", description: "Cada letra correctamente escrita en la palabra atacante resta 2 puntos de vida al oponente." },
  { title: "Daño por Falta de Sílaba", description: "Si la palabra escrita no contiene la sílaba proporcionada en el turno, el jugador recibe un daño de 20 puntos." },
  { title: "Defensa Creativa", description: "Antes de recibir un ataque, el jugador puede intentar defenderse creando una palabra que incluya la sílaba en cuestión. Si tiene éxito, reduce el daño recibido a la mitad." },
  { title: "Recuperación Estratégica", description: "Después de recibir un ataque, el jugador tiene la opción de recuperar 5 puntos de vida si construye una palabra que comience con la última letra de la palabra atacante." },
  // { title: "Desafío Lingüístico", description: "En cada turno, se asigna una letra como 'letra desafiante'. Si un jugador utiliza esa letra en su palabra, su ataque causa 5 de daño adicional." },
  // { title: "Bono Aleatorio de Vida", description: "Al inicio de cada ronda, se selecciona al azar una sílaba adicional. Si un jugador utiliza esa sílaba en su palabra, obtiene un bono de 10 puntos de vida." },
]

