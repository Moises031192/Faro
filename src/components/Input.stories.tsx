import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconMail, IconSearch, IconUser } from '@tabler/icons-react'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: false },
  },
  args: {
    label: 'Nombre',
    placeholder: 'Escribe tu nombre',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Toca los controles de abajo para probar cualquier combinación. */
export const Playground: Story = {}

export const Tamanos: Story = {
  name: 'Tamaños',
  render: () => (
    <div className="space-y-4">
      <Input size="sm" label="Pequeño" placeholder="1 comprimido" />
      <Input size="md" label="Mediano" placeholder="1 comprimido" />
      <Input size="lg" label="Grande" placeholder="1 comprimido" />
    </div>
  ),
}

export const ConIcono: Story = {
  name: 'Con icono',
  render: () => (
    <div className="space-y-4">
      <Input label="Nombre" icon={IconUser} placeholder="Tu nombre" />
      <Input
        label="Correo"
        type="email"
        icon={IconMail}
        placeholder="tu@correo.com"
      />
      <Input
        label="Buscar medicación"
        icon={IconSearch}
        placeholder="Ibuprofeno..."
      />
    </div>
  ),
}

export const ConAyuda: Story = {
  name: 'Con ayuda',
  args: {
    label: 'Correo',
    type: 'email',
    placeholder: 'tu@correo.com',
    hint: 'Lo usamos para avisarte de tus citas.',
  },
}

export const ConError: Story = {
  name: 'Con error',
  args: {
    label: 'Teléfono',
    defaultValue: '123',
    error: 'El teléfono debe tener 9 cifras.',
  },
}

export const Desactivado: Story = {
  args: {
    label: 'Historial',
    defaultValue: 'No editable',
    disabled: true,
  },
}

export const Estados: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Normal" placeholder="Escribe aquí" />
      <Input label="Con ayuda" hint="Un texto que orienta." placeholder="Escribe aquí" />
      <Input label="Con error" defaultValue="123" error="Revisa este dato." />
      <Input label="Desactivado" defaultValue="No editable" disabled />
    </div>
  ),
}
