import type { HTMLAttributes, ReactNode } from 'react'
import type { TablerIcon } from '@tabler/icons-react'
import { cn } from '../lib/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Título de la tarjeta. */
  title?: string
  /** Frase corta bajo el título. */
  description?: string
  /** Icono opcional de Tabler, a la izquierda del título. */
  icon?: TablerIcon
  /** Contenido alineado a la derecha del título: un botón, una etiqueta... */
  action?: ReactNode
  /** Zona inferior separada por una línea. */
  footer?: ReactNode
  /** Resalta el borde al pasar el ratón. Úsalo si la tarjeta es pulsable. */
  interactive?: boolean
}

export function Card({
  title,
  description,
  icon: Icon,
  action,
  footer,
  interactive = false,
  className,
  children,
  ...resto
}: CardProps) {
  const hayCabecera = Boolean(title || description || Icon || action)

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 bg-white shadow-sm',
        interactive &&
          'cursor-pointer transition-colors hover:border-teal-300 hover:shadow-md',
        className,
      )}
      {...resto}
    >
      {hayCabecera && (
        <div className="flex items-start gap-3 p-5">
          {Icon && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Icon size={20} stroke={1.8} aria-hidden="true" />
            </span>
          )}
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="mt-0.5 text-sm text-gray-600">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      {children && (
        <div className={cn('px-5 pb-5', !hayCabecera && 'pt-5')}>
          {children}
        </div>
      )}

      {footer && (
        <div className="border-t border-gray-200 px-5 py-3">{footer}</div>
      )}
    </div>
  )
}
