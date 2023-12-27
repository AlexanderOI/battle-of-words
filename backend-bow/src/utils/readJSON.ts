import * as fs from 'node:fs/promises'

export async function ReadJSON(path: string) {
  try {
    const data = await fs.readFile(path, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al cargar datos desde el archivo JSON:', error)
    return {};
  }
}