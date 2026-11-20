// Lee docs/componentes.md tal cual está en disco y lo pinta.
// El contenido NO se copia aquí: este archivo solo sabe dibujarlo.
import markdown from '../../docs/componentes.md?raw'

type Bloque =
  | { tipo: 'titulo'; nivel: 1 | 2 | 3; texto: string }
  | { tipo: 'parrafo'; texto: string }
  | { tipo: 'tabla'; cabecera: string[]; filas: string[][] }

/** Parte una línea «| a | b |» en sus celdas. */
function celdas(linea: string): string[] {
  return linea
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map((celda) => celda.trim())
}

const esSeparador = (linea: string) => /^\s*\|[\s:|-]+\|\s*$/.test(linea)
const esFilaTabla = (linea: string) => /^\s*\|/.test(linea)

/**
 * Lee el subconjunto de Markdown que usa docs/componentes.md:
 * títulos, párrafos y tablas. No pretende entender Markdown entero.
 */
function leerMarkdown(texto: string): Bloque[] {
  const lineas = texto.split('\n')
  const bloques: Bloque[] = []
  let parrafo: string[] = []

  const cerrarParrafo = () => {
    if (parrafo.length > 0) {
      bloques.push({ tipo: 'parrafo', texto: parrafo.join(' ') })
      parrafo = []
    }
  }

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i]

    if (linea.trim() === '') {
      cerrarParrafo()
      continue
    }

    const titulo = /^(#{1,3})\s+(.*)$/.exec(linea)
    if (titulo) {
      cerrarParrafo()
      bloques.push({
        tipo: 'titulo',
        nivel: titulo[1].length as 1 | 2 | 3,
        texto: titulo[2].trim(),
      })
      continue
    }

    if (esFilaTabla(linea) && esSeparador(lineas[i + 1] ?? '')) {
      cerrarParrafo()
      const cabecera = celdas(linea)
      const filas: string[][] = []
      i += 2
      while (i < lineas.length && esFilaTabla(lineas[i])) {
        filas.push(celdas(lineas[i]))
        i++
      }
      i--
      bloques.push({ tipo: 'tabla', cabecera, filas })
      continue
    }

    parrafo.push(linea.trim())
  }

  cerrarParrafo()
  return bloques
}

const TITULOS = {
  1: 'mt-0 mb-3 text-3xl font-bold text-gray-900',
  2: 'mt-8 mb-3 text-xl font-semibold text-gray-900',
  3: 'mt-6 mb-2 text-base font-semibold text-gray-900',
} as const

export function TablaEstado() {
  const bloques = leerMarkdown(markdown)

  return (
    <div className="max-w-2xl">
      {bloques.map((bloque, indice) => {
        if (bloque.tipo === 'titulo') {
          const Etiqueta = `h${bloque.nivel}` as 'h1' | 'h2' | 'h3'
          return (
            <Etiqueta key={indice} className={TITULOS[bloque.nivel]}>
              {bloque.texto}
            </Etiqueta>
          )
        }

        if (bloque.tipo === 'parrafo') {
          return (
            <p key={indice} className="mb-3 text-sm text-gray-600">
              {bloque.texto}
            </p>
          )
        }

        return (
          <table
            key={indice}
            className="mt-4 w-full border-collapse overflow-hidden rounded-lg border border-gray-200 text-sm"
          >
            <thead>
              <tr className="bg-gray-50">
                {bloque.cabecera.map((celda) => (
                  <th
                    key={celda}
                    className="border-b border-gray-200 px-4 py-2 text-left font-semibold text-gray-700"
                  >
                    {celda}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila) => (
                <tr key={fila[0]} className="even:bg-gray-50/50">
                  {fila.map((celda, columna) => (
                    <td
                      key={columna}
                      className={
                        columna === 0
                          ? 'border-b border-gray-100 px-4 py-2 font-medium text-gray-900'
                          : 'border-b border-gray-100 px-4 py-2 text-gray-600'
                      }
                    >
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )
      })}

      <p className="mt-6 text-xs text-gray-400">
        Esta página se genera a partir de docs/componentes.md. Para cambiarla,
        edita ese archivo.
      </p>
    </div>
  )
}
