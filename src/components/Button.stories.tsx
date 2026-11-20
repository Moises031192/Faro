import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconCalendarEvent,
  IconChevronDown,
  IconChevronRight,
  IconDotsVertical,
  IconDownload,
  IconFilter,
  IconPencil,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // Los iconos son componentes, no valores que se puedan elegir en un menú.
    iconLeft: { control: false },
    iconRight: { control: false },
  },
  args: {
    children: 'Guardar',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Toca los controles de abajo para probar cualquier combinación. */
export const Playground: Story = {}

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Guardar</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="ghost">Ver más</Button>
      <Button variant="danger" iconLeft={IconTrash}>
        Eliminar
      </Button>
    </div>
  ),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" iconLeft={IconPlus}>
        Pequeño
      </Button>
      <Button size="md" iconLeft={IconPlus}>
        Mediano
      </Button>
      <Button size="lg" iconLeft={IconPlus}>
        Grande
      </Button>
    </div>
  ),
}

export const IconoIzquierda: Story = {
  name: 'Icono a la izquierda',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconLeft={IconDownload}>Descargar PDF</Button>
      <Button variant="secondary" iconLeft={IconPlus}>
        Añadir cita
      </Button>
    </div>
  ),
}

export const IconoDerecha: Story = {
  name: 'Icono a la derecha',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconRight={IconChevronRight}>Siguiente</Button>
      <Button variant="secondary" iconRight={IconChevronDown}>
        Ver opciones
      </Button>
    </div>
  ),
}

/**
 * Un icono a cada lado del texto. Útil cuando el de la izquierda dice de qué
 * trata el botón y el de la derecha, qué va a pasar al pulsarlo.
 */
export const DosIconos: Story = {
  name: 'Dos iconos',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconLeft={IconCalendarEvent} iconRight={IconChevronRight}>
        Próxima cita
      </Button>
      <Button
        variant="secondary"
        iconLeft={IconFilter}
        iconRight={IconChevronDown}
      >
        Filtrar análisis
      </Button>
      <Button
        variant="ghost"
        size="sm"
        iconLeft={IconDownload}
        iconRight={IconChevronDown}
      >
        Exportar
      </Button>
    </div>
  ),
}

/**
 * Sin texto, el botón se vuelve cuadrado. Como no hay nada que leer en voz
 * alta, `aria-label` es obligatorio: TypeScript da error si falta.
 */
export const SoloIcono: Story = {
  name: 'Solo icono',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button iconLeft={IconPlus} aria-label="Añadir medicación" />
      <Button variant="secondary" iconLeft={IconPencil} aria-label="Editar" />
      <Button
        variant="ghost"
        iconLeft={IconDotsVertical}
        aria-label="Más opciones"
      />
      <Button variant="danger" iconLeft={IconTrash} aria-label="Eliminar" />
    </div>
  ),
}

export const SoloIconoTamanos: Story = {
  name: 'Solo icono · tamaños',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" iconLeft={IconPlus} aria-label="Añadir (pequeño)" />
      <Button size="md" iconLeft={IconPlus} aria-label="Añadir (mediano)" />
      <Button size="lg" iconLeft={IconPlus} aria-label="Añadir (grande)" />
    </div>
  ),
}

export const Estados: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Guardando</Button>
      <Button disabled>Desactivado</Button>
      <Button variant="secondary" disabled>
        Desactivado
      </Button>
      <Button loading iconLeft={IconPlus} aria-label="Guardando" />
    </div>
  ),
}

export const AnchoCompleto: Story = {
  name: 'Ancho completo',
  render: () => (
    <div className="max-w-sm">
      <Button fullWidth iconLeft={IconPlus}>
        Añadir medicación
      </Button>
    </div>
  ),
}
