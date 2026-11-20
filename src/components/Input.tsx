import { useId, type InputHTMLAttributes } from 'react'
import type { TablerIcon } from '@tabler/icons-react'
import { cn } from '../lib/cn'

export type InputSize = 'sm' | 'md' | 'lg'

const TAMANOS: Record<InputSize, string> = {
  sm: 'h-8 rounded-md text-sm',
  md: 'h-10 rounded-lg text-sm',
  lg: 'h-12 rounded-lg text-base',
}

const TAMANO_ICONO: Record<InputSize, number> = { sm: 16, md: 18, lg: 20 }

/** Hueco a la izquierda para que el texto no se monte sobre el icono. */
const SANGRIA_CON_ICONO: Record<InputSize, string> = {
  sm: 'pl-8',
  md: 'pl-10',
  lg: 'pl-11',
}

const POSICION_ICONO: Record<InputSize, string> = {
  sm: 'left-2.5',
  md: 'left-3',
  lg: 'left-3.5',
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Etiqueta visible encima del campo. */
  label?: string
  /** Texto de ayuda bajo el campo. Se oculta si hay error. */
  hint?: string
  /** Mensaje de error. Pinta el campo en rojo y sustituye al hint. */
  error?: string
  /** Icono opcional de Tabler dentro del campo, a la izquierda. */
  icon?: TablerIcon
  /** Alto y tipografía del campo. Por defecto: md. */
  size?: InputSize
}

export function Input({
  label,
  hint,
  error,
  icon: Icon,
  size = 'md',
  id,
  className,
  disabled,
  ...resto
}: InputProps) {
  const idAuto = useId()
  const idCampo = id ?? idAuto
  const idMensaje = `${idCampo}-mensaje`
  const hayError = Boolean(error)
  const mensaje = error ?? hint

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={idCampo}
          className="mb-1.5 block text-sm font-medium text-gray-800"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <Icon
            size={TAMANO_ICONO[size]}
            stroke={2}
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 -translate-y-1/2',
              hayError ? 'text-red-500' : 'text-gray-400',
              POSICION_ICONO[size],
            )}
          />
        )}
        <input
          id={idCampo}
          disabled={disabled}
          aria-invalid={hayError || undefined}
          aria-describedby={mensaje ? idMensaje : undefined}
          className={cn(
            'block w-full border bg-white px-3 text-gray-900 transition-colors',
            'placeholder:text-gray-400',
            'focus:outline-2 focus:outline-offset-0',
            'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
            hayError
              ? 'border-red-400 focus:outline-red-500'
              : 'border-gray-300 focus:border-teal-500 focus:outline-teal-500',
            TAMANOS[size],
            Icon && SANGRIA_CON_ICONO[size],
            className,
          )}
          {...resto}
        />
      </div>

      {mensaje && (
        <p
          id={idMensaje}
          className={cn(
            'mt-1.5 text-xs',
            hayError ? 'text-red-600' : 'text-gray-500',
          )}
        >
          {mensaje}
        </p>
      )}
    </div>
  )
}
