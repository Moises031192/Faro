import type { ButtonHTMLAttributes, ReactNode } from 'react'
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

/** Alto, hueco entre icono y texto, y redondeo de las esquinas. */
const TAMANOS: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 rounded-full text-sm',
  md: 'h-10 gap-2 rounded-full text-sm',
  lg: 'h-12 gap-2 rounded-full text-base',
}

/** Relleno lateral cuando el botón lleva texto. */
const RELLENO: Record<ButtonSize, string> = {
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-6',
}

/** Sin texto el botón es cuadrado: mismo ancho que alto. */
const CUADRADO: Record<ButtonSize, string> = {
  sm: 'w-8',
  md: 'w-10',
  lg: 'w-12',
}

const TAMANO_ICONO: Record<ButtonSize, number> = { sm: 16, md: 18, lg: 20 }

type ButtonBase = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  /** Qué peso visual tiene el botón. Por defecto: primary. */
  variant?: ButtonVariant
  /** Alto y tipografía del botón. Por defecto: md. */
  size?: ButtonSize
  /** Icono de Tabler a la izquierda del texto: iconLeft={IconPlus} */
  iconLeft?: TablerIcon
  /** Icono de Tabler a la derecha del texto: iconRight={IconChevronRight} */
  iconRight?: TablerIcon
  /** Muestra una rueda girando y bloquea el botón. */
  loading?: boolean
  /** Ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

/**
 * Un botón sin texto no se puede leer en voz alta, así que en ese caso
 * aria-label es obligatorio: TypeScript avisa si falta.
 */
export type ButtonProps = ButtonBase &
  ({ children: ReactNode } | { children?: undefined; 'aria-label': string })

export function Button({
  variant = 'primary',
  size = 'md',
  iconLeft: IconLeft,
  iconRight: IconRight,
  loading = false,
  fullWidth = false,
  type = 'button',
  disabled,
  className,
  children,
  ...resto
}: ButtonProps) {
  const tamanoIcono = TAMANO_ICONO[size]
  const soloIcono = children === undefined

  const rueda = (
    <IconLoader2
      size={tamanoIcono}
      stroke={2}
      className="animate-spin"
      aria-hidden="true"
    />
  )

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        'inline-flex shrink-0 items-center justify-center font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        VARIANTES[variant],
        TAMANOS[size],
        soloIcono ? CUADRADO[size] : RELLENO[size],
        fullWidth && !soloIcono && 'w-full',
        className,
      )}
      {...resto}
    >
      {loading
        ? rueda
        : IconLeft && (
            <IconLeft size={tamanoIcono} stroke={2} aria-hidden="true" />
          )}

      {children}

      {!loading && IconRight && (
        <IconRight size={tamanoIcono} stroke={2} aria-hidden="true" />
      )}
    </button>
  )
}
