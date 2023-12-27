export const generateRandomWord = (wordFragments: number[]): number => {
  const randomIndex = Math.floor(Math.random() * wordFragments.length)
  const randomWord = wordFragments[randomIndex]

  return randomWord
}