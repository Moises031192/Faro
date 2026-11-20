/**
 * Junta clases de CSS y descarta las que estén vacías.
 * Permite escribir condiciones sin acabar con espacios sueltos:
 *   cn('p-4', activo && 'bg-teal-50')
 */
export function cn(
  ...clases: Array<string | false | null | undefined>
): string {
  return clases.filter(Boolean).join(' ')
}
