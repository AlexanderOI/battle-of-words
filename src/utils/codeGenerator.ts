export const codeGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * characters.length)
    code += characters.charAt(index)
  }
  return code
}
