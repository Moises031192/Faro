import type { ButtonHTMLAttributes } from 'react'
import { IconLoader2, type TablerIcon } from '@tabler/icons-react'
import { cn } from '../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTES: Record<ButtonVariant, string> = {
  primary:
    'bg-teal-600 text-white hover:bg-teal-700 active:bg-teal-800 outline-teal-600',
  secondary:
    'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 outline-gray-500',
  ghost:
    'text-gray-700 hover:bg-gray-100 active:bg-gray-200 outline-gray-500',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 outline-red-600',
}

const TAMANOS: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 rounded-md px-3 text-sm',
  md: 'h-10 gap-2 rounded-lg px-4 text-sm',
  lg: 'h-12 gap-2 rounded-lg px-6 text-base',
}

const TAMANO_ICONO: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Qué peso visual tiene el botón. Por defecto: primary. */
  variant?: ButtonVariant
  /** Alto y tipografía del botón. Por defecto: md. */
  size?: ButtonSize
  /** Icono opcional de Tabler, pasado como componente: icon={IconPlus} */
  icon?: TablerIcon
  /** A qué lado del texto va el icono. Por defecto: left. */
  iconPosition?: 'left' | 'right'
  /** Muestra una rueda girando y bloquea el botón. */
  loading?: boolean
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  type = 'button',
  disabled,
  className,
  children,
  ...resto
}: ButtonProps) {
  const tamanoIcono = TAMANO_ICONO[size]
  const icono = Icon ? (
    <Icon size={tamanoIcono} stroke={2} aria-hidden="true" />
  ) : null

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTES[variant],
        TAMANOS[size],
        fullWidth && 'w-full',
        className,
      )}
      {...resto}
    >
      {loading ? (
        <IconLoader2
          size={tamanoIcono}
          stroke={2}
          className="animate-spin"
          aria-hidden="true"
        />
      ) : (
        iconPosition === 'left' && icono
      )}
      {children}
      {!loading && iconPosition === 'right' && icono}
    </button>
  )
}
