import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconCalendarEvent,
  IconDownload,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // El icono es un componente, no un valor que se pueda elegir en un menú.
    icon: { control: false },
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
      <Button variant="danger" icon={IconTrash}>
        Eliminar
      </Button>
    </div>
  ),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" icon={IconPlus}>
        Pequeño
      </Button>
      <Button size="md" icon={IconPlus}>
        Mediano
      </Button>
      <Button size="lg" icon={IconPlus}>
        Grande
      </Button>
    </div>
  ),
}

export const ConIcono: Story = {
  name: 'Con icono',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={IconDownload}>Icono a la izquierda</Button>
      <Button
        variant="secondary"
        icon={IconCalendarEvent}
        iconPosition="right"
      >
        Icono a la derecha
      </Button>
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
      <Button variant="danger" disabled>
        Desactivado
      </Button>
    </div>
  ),
}

export const AnchoCompleto: Story = {
  name: 'Ancho completo',
  render: () => (
    <div className="max-w-sm">
      <Button fullWidth icon={IconPlus}>
        Añadir medicación
      </Button>
    </div>
  ),
}
