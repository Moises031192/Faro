import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconAlertTriangle,
  IconCheck,
  IconClock,
} from '@tabler/icons-react'
import { Badge } from './Badge'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
  },
  args: {
    children: 'Al día',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

/** Toca los controles de abajo para probar cualquier combinación. */
export const Playground: Story = {}

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="neutral">Sin empezar</Badge>
      <Badge variant="info">Programado</Badge>
      <Badge variant="success">Al día</Badge>
      <Badge variant="warning">Caduca pronto</Badge>
      <Badge variant="danger">Fuera de rango</Badge>
    </div>
  ),
}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm" variant="success">
        Pequeña
      </Badge>
      <Badge size="md" variant="success">
        Mediana
      </Badge>
    </div>
  ),
}

export const ConIcono: Story = {
  name: 'Con icono',
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" icon={IconCheck}>
        Al día
      </Badge>
      <Badge variant="warning" icon={IconAlertTriangle}>
        Caduca pronto
      </Badge>
      <Badge variant="info" icon={IconClock}>
        En 3 días
      </Badge>
    </div>
  ),
}
