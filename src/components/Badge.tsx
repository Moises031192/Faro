import type { HTMLAttributes } from 'react'
import type { TablerIcon } from '@tabler/icons-react'
import { cn } from '../lib/cn'

export type BadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
export type BadgeSize = 'sm' | 'md'

const VARIANTES: Record<BadgeVariant, string> = {
  neutral: 'bg-gray-100 text-gray-700 ring-gray-200',
  info: 'bg-blue-50 text-blue-700 ring-blue-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  danger: 'bg-red-50 text-red-700 ring-red-200',
}

const TAMANOS: Record<BadgeSize, string> = {
  sm: 'h-5 gap-1 px-2 text-xs',
  md: 'h-6 gap-1.5 px-2.5 text-sm',
}

const TAMANO_ICONO: Record<BadgeSize, number> = { sm: 12, md: 14 }

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color según lo que se quiera comunicar. Por defecto: neutral. */
  variant?: BadgeVariant
  /** Alto y tipografía de la etiqueta. Por defecto: sm. */
  size?: BadgeSize
  /** Icono opcional de Tabler, delante del texto. */
  icon?: TablerIcon
}

export function Badge({
  variant = 'neutral',
  size = 'sm',
  icon: Icon,
  className,
  children,
  ...resto
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium ring-1 ring-inset',
        VARIANTES[variant],
        TAMANOS[size],
        className,
      )}
      {...resto}
    >
      {Icon && (
        <Icon size={TAMANO_ICONO[size]} stroke={2.2} aria-hidden="true" />
      )}
      {children}
    </span>
  )
}
