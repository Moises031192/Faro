import {
  IconCalendarEvent,
  IconChartLine,
  IconFlask,
  IconMicrophone,
  IconNotes,
  IconPill,
  IconRobot,
  IconTarget,
} from '@tabler/icons-react'
import { ComponentsPreview } from './ComponentsPreview'

const COLORS = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
]

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const SPACING = [
  '0.5',
  '1',
  '1.5',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '16',
  '20',
  '24',
]

const RADII = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']

const TEXT_SIZES = [
  'xs',
  'sm',
  'base',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
]

const ICONS = [
  { name: 'IconPill', Icon: IconPill },
  { name: 'IconFlask', Icon: IconFlask },
  { name: 'IconCalendarEvent', Icon: IconCalendarEvent },
  { name: 'IconMicrophone', Icon: IconMicrophone },
  { name: 'IconNotes', Icon: IconNotes },
  { name: 'IconRobot', Icon: IconRobot },
  { name: 'IconTarget', Icon: IconTarget },
  { name: 'IconChartLine', Icon: IconChartLine },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-gray-200 py-10">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm text-gray-600">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="pb-10">
        <p className="text-sm font-medium tracking-wide text-gray-500 uppercase">
          Faro DS
        </p>
        <h1 className="mt-2 text-4xl font-bold text-gray-900">Catálogo</h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600">
          Los primeros componentes de Faro DS y, debajo, los valores de Tailwind
          sobre los que están construidos.
        </p>
      </header>

      <ComponentsPreview />

      <div className="border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900">
          Valores por defecto de Tailwind
        </h2>
        <p className="mt-2 max-w-2xl text-base text-gray-600">
          Lo que viene a continuación no son decisiones de Faro: son los valores
          que Tailwind CSS v4 trae de serie, el punto de partida del que iremos
          eligiendo.
        </p>
      </div>

      <Section
        title="Paleta de color"
        description="22 colores, cada uno con 11 tonos del 50 (el más claro) al 950 (el más oscuro). Se usan con clases como bg-red-500 o text-slate-700."
      >
        <div className="space-y-3">
          {COLORS.map((color) => (
            <div key={color} className="flex items-center gap-4">
              <span className="w-20 shrink-0 text-sm text-gray-700">
                {color}
              </span>
              <div className="flex flex-1 gap-1">
                {SHADES.map((shade) => (
                  <div key={shade} className="flex-1">
                    <div
                      className="h-10 rounded border border-black/5"
                      style={{
                        backgroundColor: `var(--color-${color}-${shade})`,
                      }}
                      title={`${color}-${shade}`}
                    />
                    <div className="mt-1 text-center text-[10px] text-gray-500">
                      {shade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Espaciado"
        description="La unidad base es 0.25rem (4 píxeles) y cada paso es un múltiplo. Se usa en márgenes, rellenos y huecos, con clases como p-4 o gap-2."
      >
        <div className="space-y-2">
          {SPACING.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-14 shrink-0 text-right text-sm text-gray-700">
                {step}
              </span>
              <div
                className="h-5 rounded-sm bg-teal-600"
                style={{ width: `calc(var(--spacing) * ${step})` }}
              />
              <span className="text-xs text-gray-500">
                {Number(step) * 0.25}rem · {Number(step) * 4}px
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Radios"
        description="El redondeo de las esquinas, de menos a más. Se usa con clases como rounded-lg."
      >
        <div className="flex flex-wrap gap-6">
          {RADII.map((radius) => (
            <div key={radius} className="text-center">
              <div
                className="size-20 border border-gray-300 bg-gray-100"
                style={{ borderRadius: `var(--radius-${radius})` }}
              />
              <div className="mt-2 text-xs text-gray-600">rounded-{radius}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Tamaños de texto"
        description="Cada tamaño trae ya su altura de línea. Se usa con clases como text-lg."
      >
        <div className="space-y-4">
          {TEXT_SIZES.map((size) => (
            <div key={size} className="flex items-baseline gap-4">
              <span className="w-20 shrink-0 text-sm text-gray-500">
                text-{size}
              </span>
              <span
                className="truncate text-gray-900"
                style={{
                  fontSize: `var(--text-${size})`,
                  lineHeight: `var(--text-${size}--line-height)`,
                }}
              >
                Faro DS
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Iconos de Tabler"
        description="Ocho iconos de @tabler/icons-react, la librería de iconos que usaremos. Heredan el color y el tamaño del texto."
      >
        <div className="flex flex-wrap gap-4">
          {ICONS.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex w-36 flex-col items-center gap-2 rounded-lg border border-gray-200 p-4"
            >
              <Icon size={28} stroke={1.5} className="text-teal-700" />
              <span className="text-center text-xs text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
