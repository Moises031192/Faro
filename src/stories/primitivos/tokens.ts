// Lee tokens/tokens.json y prepara los datos para la página Fundamentos/Primitivos.
// Aquí no se dibuja nada: eso lo hace Muestras.tsx.
import json from '../../../tokens/tokens.json'

export type Dimension = { value: number; unit: 'px' | 'rem' }
export type Color = {
  colorSpace: 'oklch' | 'srgb'
  components: [number, number, number]
  alpha?: number
  hex: string
}
export type Token<T> = { $value: T; $description?: string }

/** La capa primitive de tokens/tokens.json. */
export const primitive = json.primitive

const esNumero = (clave: string) => /^\d+$/.test(clave)

/**
 * Las entradas de un grupo, sin las claves que empiezan por $ ($type, $description).
 * JavaScript pone las claves como «100» delante de «050», así que se reordenan:
 * primero las numéricas de menor a mayor y después el resto (full, xs, sm…) en su orden.
 */
export function entradas<T>(grupo: object): [string, Token<T>][] {
  const lista = Object.entries(grupo).filter(([clave]) => !clave.startsWith('$')) as [
    string,
    Token<T>,
  ][]
  return lista.sort(([a], [b]) => {
    if (esNumero(a) && esNumero(b)) return Number(a) - Number(b)
    return Number(esNumero(b)) - Number(esNumero(a))
  })
}

/** Convierte un valor de token en algo que entiende CSS. */
export const css = {
  color(c: Color): string {
    const [a, b, d] = c.components
    if (c.colorSpace === 'oklch') return `oklch(${a} ${b} ${d})`
    return `rgb(${a * 255} ${b * 255} ${d * 255} / ${c.alpha ?? 1})`
  },
  dim: (d: Dimension) => `${d.value}${d.unit}`,
  px: (d: Dimension) => (d.unit === 'rem' ? d.value * 16 : d.value),
}
