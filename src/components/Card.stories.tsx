import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  IconCalendarEvent,
  IconDownload,
  IconFlask,
  IconPill,
} from '@tabler/icons-react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
    action: { control: false },
    footer: { control: false },
  },
  args: {
    title: 'Omeprazol 20 mg',
    description: '1 comprimido en ayunas',
    children: 'Quedan 12 comprimidos.',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Toca los controles de abajo para probar cualquier combinación. */
export const Playground: Story = {}

export const Completa: Story = {
  render: () => (
    <Card
      icon={IconPill}
      title="Omeprazol 20 mg"
      description="1 comprimido en ayunas"
      action={<Badge variant="success">Al día</Badge>}
      footer={
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Próxima toma: mañana, 8:00
          </span>
          <Button size="sm" variant="ghost">
            Ver receta
          </Button>
        </div>
      }
    >
      <p className="text-sm text-gray-600">
        Recetado por Dra. Lucía Marín el 4 de marzo. Quedan 12 comprimidos.
      </p>
    </Card>
  ),
}

export const SoloContenido: Story = {
  name: 'Solo contenido',
  render: () => (
    <Card>
      <p className="text-sm text-gray-600">
        Una tarjeta sin cabecera ni pie: solo lo que le pases dentro.
      </p>
    </Card>
  ),
}

export const SinPie: Story = {
  name: 'Sin pie',
  render: () => (
    <Card
      icon={IconFlask}
      title="Análisis de sangre"
      description="Realizado el 2 de noviembre"
      action={<Badge variant="warning">2 valores a revisar</Badge>}
    >
      <p className="text-sm text-gray-600">
        Colesterol y vitamina D fuera del rango de referencia.
      </p>
    </Card>
  ),
}

export const ConPie: Story = {
  name: 'Con pie',
  render: () => (
    <Card
      icon={IconFlask}
      title="Análisis de sangre"
      description="Realizado el 2 de noviembre"
      footer={
        <Button size="sm" variant="secondary" iconLeft={IconDownload}>
          Descargar PDF
        </Button>
      }
    >
      <p className="text-sm text-gray-600">
        Todos los valores dentro del rango de referencia.
      </p>
    </Card>
  ),
}

export const Pulsable: Story = {
  render: () => (
    <Card
      icon={IconCalendarEvent}
      title="Revisión dental"
      description="Jueves 12, a las 17:30"
      interactive
    >
      <p className="text-sm text-gray-600">
        Clínica Sanz · Calle Mayor 14. Pasa el ratón por encima.
      </p>
    </Card>
  ),
}
