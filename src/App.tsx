import { useEffect, useState, type ComponentType } from 'react'
import { IconArrowRight, IconDeviceDesktop } from '@tabler/icons-react'
import { Card } from './components'
import { ComponentsPreview } from './ComponentsPreview'
import TailwindTokens from './TailwindTokens'
import { cn } from './lib/cn'

type Pagina = {
  /** La dirección, con su almohadilla: '#/antes'. */
  ruta: string
  titulo: string
  Componente: ComponentType
}

/**
 * Cada archivo de src/screens/ se convierte solo en una página con su propia
 * dirección. No hay que apuntarlo en ninguna lista: basta con crear el archivo,
 * exportar el componente con `export default` y, si quieres un nombre bonito
 * para el menú, exportar también `titulo`.
 */
const MODULOS = import.meta.glob<{
  default: ComponentType
  titulo?: string
}>('./screens/*.tsx', { eager: true })

const PANTALLAS: Pagina[] = Object.entries(MODULOS)
  .map(([archivo, modulo]) => {
    const nombre = archivo.slice('./screens/'.length, -'.tsx'.length)
    return {
      ruta: `#/${nombre}`,
      titulo: modulo.titulo ?? nombre,
      Componente: modulo.default,
    }
  })
  .sort((a, b) => a.ruta.localeCompare(b.ruta))

const PAGINAS: Pagina[] = [
  { ruta: '#/tailwind', titulo: 'Tailwind', Componente: TailwindTokens },
  {
    ruta: '#/componentes',
    titulo: 'Componentes',
    Componente: ComponentsPreview,
  },
  ...PANTALLAS,
]

/** Devuelve la dirección actual y se entera cuando cambia. */
function useRuta() {
  const [ruta, setRuta] = useState(() => window.location.hash || '#/')

  useEffect(() => {
    const alCambiar = () => setRuta(window.location.hash || '#/')
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  return ruta
}

function Menu({ ruta }: { ruta: string }) {
  return (
    <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-1 px-6 py-3">
        <a
          href="#/"
          className="mr-3 text-sm font-semibold tracking-wide text-gray-900 uppercase"
        >
          Faro DS
        </a>
        {PAGINAS.map((pagina) => {
          const activa = ruta === pagina.ruta
          return (
            <a
              key={pagina.ruta}
              href={pagina.ruta}
              aria-current={activa ? 'page' : undefined}
              className={cn(
                'rounded-full px-3 py-1.5 text-sm transition-colors',
                activa
                  ? 'bg-teal-50 font-medium text-teal-700'
                  : 'text-gray-600 hover:bg-gray-100',
              )}
            >
              {pagina.titulo}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

function Indice() {
  return (
    <div>
      <header className="pb-6">
        <h1 className="text-2xl font-bold text-gray-900">Índice</h1>
        <p className="mt-2 max-w-2xl text-base text-gray-600">
          El catálogo de Faro DS y las pantallas construidas con él. Cada una
          tiene su propia dirección, así que se puede compartir el enlace.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {PAGINAS.map((pagina) => (
          <a key={pagina.ruta} href={pagina.ruta} className="block">
            <Card
              interactive
              icon={IconDeviceDesktop}
              title={pagina.titulo}
              action={
                <IconArrowRight
                  size={18}
                  stroke={2}
                  className="text-gray-400"
                  aria-hidden="true"
                />
              }
              description={pagina.ruta}
            />
          </a>
        ))}
      </div>
    </div>
  )
}

function NoEncontrada({ ruta }: { ruta: string }) {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Aquí no hay nada</h1>
      <p className="mt-2 text-base text-gray-600">
        La dirección <code className="text-gray-900">{ruta}</code> no
        corresponde a ninguna página.
      </p>
      <p className="mt-4">
        <a href="#/" className="text-sm font-medium text-teal-700">
          Volver al índice
        </a>
      </p>
    </div>
  )
}

export default function App() {
  const ruta = useRuta()
  const pagina = PAGINAS.find((candidata) => candidata.ruta === ruta)

  return (
    <>
      <Menu ruta={ruta} />
      <main className="mx-auto max-w-5xl px-6 py-10">
        {pagina ? (
          <pagina.Componente />
        ) : ruta === '#/' ? (
          <Indice />
        ) : (
          <NoEncontrada ruta={ruta} />
        )}
      </main>
    </>
  )
}
