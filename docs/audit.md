# Auditoría del design system

Documento de solo lectura: describe lo que hay, no propone cambios. Las secciones 1 a 4
retratan los componentes en el commit `daa11d3`; la sección 5 revisa la primera pantalla
construida con ellos, añadida en `a3e45e4`.

**Punto de partida:** no existe ninguna capa de tokens. `src/index.css` es una sola
línea (`@import 'tailwindcss' theme(static);`), sin bloque `@theme`, así que todo valor
de color, espaciado y radio que aparece en los componentes es una clase literal de
Tailwind escrita a mano. No hay nombres con significado (`primary`, `danger`,
`surface`) en ninguna parte del código.

---

## 1. Inventario de componentes

Cuatro componentes, todos en `src/components/`, exportados por nombre (no hay
`export default`) y reexportados en `src/components/index.ts`.

| Componente | Variantes | Tamaños | Por defecto |
| --- | --- | --- | --- |
| `Button` | `primary`, `secondary`, `ghost`, `danger` | `sm`, `md`, `lg` | `primary` / `md` |
| `Badge` | `neutral`, `info`, `success`, `warning`, `danger` | `sm`, `md` | `neutral` / `sm` |
| `Input` | — (ninguna) | `sm`, `md`, `lg` | — / `md` |
| `Card` | — (ninguna) | — (ninguno) | — |

### Estados y modificadores por componente

| Componente | Props de estado o forma |
| --- | --- |
| `Button` | `loading`, `fullWidth`, `disabled` (nativa), `iconLeft`, `iconRight`, modo solo icono (sin `children`) |
| `Input` | `label`, `hint`, `error`, `icon`, `disabled` (nativa) |
| `Card` | `title`, `description`, `icon`, `action`, `footer`, `interactive` |
| `Badge` | `icon` |

### Huecos del inventario

- Ni `Card` ni `Input` tienen variantes; ni `Card` tiene tamaños.
- `Badge` no tiene tamaño `lg`, a diferencia de `Button` e `Input`.
- `Button` y `Badge` comparten un único nombre de variante: `danger`. `Button` no tiene
  `success`, `warning` ni `info`; `Badge` no tiene `primary`, `secondary` ni `ghost`.

---

## 2. Colores, espaciados y radios de Tailwind por componente

### Paletas usadas

| Componente | Familias de color |
| --- | --- |
| `Button` | `teal` (600/700/800), `red` (600/700/800), `gray` (50/100/200/300/500/700/800), `white` |
| `Badge` | `gray`, `blue`, `emerald`, `amber`, `red` (50/100/200/700/800) |
| `Card` | `teal` (50/300/700), `gray` (200/600/900), `white` |
| `Input` | `teal` (500), `red` (400/500/600), `gray` (50/300/400/500/800/900), `white` |

`teal` actúa como color de acento en `Button`, `Card` e `Input`, pero **no aparece en
`Badge`**: ahí el papel de «bien» lo hace `emerald`. Son dos verdes distintos para
conceptos cercanos.

### Button — `src/components/Button.tsx`

| Capa | Valores |
| --- | --- |
| Color (L10, L12, L14, L16) | `bg-teal-600 hover:bg-teal-700 active:bg-teal-800 outline-teal-600` · `border-gray-300 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100 outline-gray-500` · `text-gray-700 hover:bg-gray-100 active:bg-gray-200` · `bg-red-600 hover:bg-red-700 active:bg-red-800 outline-red-600` |
| Alto (L21-23) | `h-8` · `h-10` · `h-12` |
| Hueco icono-texto (L21-23) | `gap-1.5` · `gap-2` · `gap-2` |
| Texto (L21-23) | `text-sm` · `text-sm` · `text-base` |
| Radio (L21-23) | `rounded-full` en los tres tamaños |
| Relleno lateral (L28-30) | `px-3` · `px-4` · `px-6` |
| Ancho si solo icono (L35-37) | `w-8` · `w-10` · `w-12` |
| Foco (L96) | `focus-visible:outline-2 focus-visible:outline-offset-2` |
| Desactivado (L97) | `opacity-50` |

### Badge — `src/components/Badge.tsx`

| Capa | Valores |
| --- | --- |
| Color (L14-18) | `bg-gray-100 text-gray-700 ring-gray-200` · `bg-blue-50 text-blue-700 ring-blue-200` · `bg-emerald-50 text-emerald-700 ring-emerald-200` · `bg-amber-50 text-amber-800 ring-amber-200` · `bg-red-50 text-red-700 ring-red-200` |
| Alto (L22-23) | `h-5` · `h-6` |
| Hueco (L22-23) | `gap-1` · `gap-1.5` |
| Relleno (L22-23) | `px-2` · `px-2.5` |
| Texto (L22-23) | `text-xs` · `text-sm` |
| Radio (L48) | `rounded-full` |
| Borde (L48) | `ring-1 ring-inset` — es el único que usa `ring` en vez de `border` |

### Card — `src/components/Card.tsx`

| Capa | Valores |
| --- | --- |
| Contenedor (L36) | `rounded-xl border border-gray-200 bg-white shadow-sm` |
| Pulsable (L38) | `hover:border-teal-300 hover:shadow-md` |
| Cabecera (L44) | `gap-3 p-5` |
| Cuadro del icono (L46) | `size-9 rounded-lg bg-teal-50 text-teal-700` |
| Título (L52) | `text-base font-semibold text-gray-900` |
| Descripción (L55) | `mt-0.5 text-sm text-gray-600` |
| Cuerpo (L63) | `px-5 pb-5`, más `pt-5` si no hay cabecera |
| Pie (L69) | `border-t border-gray-200 px-5 py-3` |

Todo el espaciado interno es `5` (20 px) salvo el pie, que usa `py-3`. No hay prop para
cambiarlo.

### Input — `src/components/Input.tsx`

| Capa | Valores |
| --- | --- |
| Alto + radio + texto (L8-10) | `h-8 rounded-md text-sm` · `h-10 rounded-lg text-sm` · `h-12 rounded-lg text-base` |
| Relleno si hay icono (L17-19) | `pl-8` · `pl-10` · `pl-11` |
| Posición del icono (L23-25) | `left-2.5` · `left-3` · `left-3.5` |
| Etiqueta (L64) | `mb-1.5 text-sm font-medium text-gray-800` |
| Campo normal (L89-95) | `border-gray-300 bg-white px-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-teal-500` |
| Campo con error (L94) | `border-red-400 focus:outline-red-500` |
| Icono (L78) | `text-red-500` con error, `text-gray-400` sin él |
| Desactivado (L92) | `disabled:bg-gray-50 disabled:text-gray-500` |
| Mensaje (L108-109) | `mt-1.5 text-xs`, `text-red-600` o `text-gray-500` |

### Radios: cuatro criterios distintos

| Componente | Radio |
| --- | --- |
| `Button` | `rounded-full` (los tres tamaños) |
| `Badge` | `rounded-full` |
| `Card` | `rounded-xl` (contenedor), `rounded-lg` (cuadro del icono) |
| `Input` | `rounded-md` en `sm`, `rounded-lg` en `md` y `lg` |

`Button` pasó a `rounded-full` en el commit `daa11d3` e `Input` no se tocó, así que hoy
un botón y un campo del mismo tamaño puestos uno al lado del otro no comparten forma.
Además `Input` es el único que cambia de radio según el tamaño.

---

## 3. Valores escritos a mano dentro de los componentes

**No hay colores hex, ni valores arbitrarios entre corchetes (`[16px]`), ni unidades
`px` en cadenas de clases.** Comprobado con búsqueda sobre `src/components/*.tsx`. Lo
que sí hay es lo siguiente.

### 3.1 Colores de Tailwind literales: todos

Cada color del sistema está escrito como clase de Tailwind dentro del componente que lo
usa. No hay ni un solo nombre intermedio. Son **49 clases de color distintas**
repartidas así:

| Archivo | Líneas | Qué contiene |
| --- | --- | --- |
| `src/components/Button.tsx` | 10, 12, 14, 16 | Las cuatro variantes, con sus estados `hover`, `active` y `outline` |
| `src/components/Badge.tsx` | 14, 15, 16, 17, 18 | Las cinco variantes (fondo, texto y anillo) |
| `src/components/Card.tsx` | 36, 38, 46, 52, 55, 69 | Borde, sombra, cuadro del icono, título, descripción y pie |
| `src/components/Input.tsx` | 64, 78, 89, 90, 92, 94, 95, 109 | Etiqueta, icono, campo, placeholder, desactivado, error y mensaje |

Consecuencia concreta: cambiar el acento de `teal` a otro color obliga a editar tres
archivos y cuatro líneas — `Button.tsx:10`, `Card.tsx:38`, `Card.tsx:46` e
`Input.tsx:95` — y aun así `Badge` seguiría en `emerald`, porque no usa `teal` en
ninguna de sus variantes.

### 3.2 Tamaños de icono en píxeles crudos

Números sueltos pasados como prop `size` a los iconos de Tabler, fuera de la escala de
Tailwind:

| Archivo y línea | Valor |
| --- | --- |
| `src/components/Button.tsx:40` | `{ sm: 16, md: 18, lg: 20 }` |
| `src/components/Input.tsx:13` | `{ sm: 16, md: 18, lg: 20 }` (duplicado exacto del anterior) |
| `src/components/Badge.tsx:26` | `{ sm: 12, md: 14 }` |
| `src/components/Card.tsx:47` | `20`, escrito en línea — es el único sin tabla de tamaños |

### 3.3 Grosores de trazo de icono, distintos en cada componente

| Archivo y línea | `stroke` |
| --- | --- |
| `src/components/Button.tsx:83, 109, 115` | `2` |
| `src/components/Input.tsx:74` | `2` |
| `src/components/Badge.tsx:56` | `2.2` |
| `src/components/Card.tsx:47` | `1.8` |

Tres grosores distintos sin criterio documentado.

### 3.4 Posiciones del icono del Input, calculadas a mano

`src/components/Input.tsx:17-19` y `23-25` mantienen dos tablas que tienen que cuadrar
entre sí: el desplazamiento del texto (`pl-8`/`pl-10`/`pl-11`) y la posición del icono
(`left-2.5`/`left-3`/`left-3.5`). Son números elegidos a ojo; si cambia el tamaño del
icono hay que recalcular ambas.

### 3.5 Diferencias de comportamiento del foco

- `src/components/Button.tsx:96` usa `focus-visible:` (solo al navegar con teclado).
- `src/components/Input.tsx:91` usa `focus:` (también al hacer clic).
- `Button` usa `outline-offset-2`; `Input`, `outline-offset-0`.

### 3.6 El helper `cn` no resuelve conflictos

`src/lib/cn.ts` concatena clases y descarta las vacías; no hace nada más. Como todos los
componentes ponen `className` **al final** de la lista, parece que una clase pasada desde
fuera debería ganar, pero no es así: entre dos clases de Tailwind de la misma propiedad
decide el orden del CSS generado, no el orden del atributo.

Orden real de los radios en el CSS que produce este proyecto (`dist/assets/*.css`):

```
.rounded-full  →  .rounded-lg  →  .rounded-md  →  .rounded-sm  →  .rounded-xl
```

Es decir:

- `<Button className="rounded-md">` **sí** se redondea menos: `.rounded-md` va después de
  `.rounded-full`.
- `<Card className="rounded-lg">` **no** cambia: `.rounded-xl` del propio componente va
  después de `.rounded-lg`.

El mismo tipo de override funciona en un componente y falla en otro. No está documentado
en ninguna parte.

---

## 4. Nombres de props y variantes que un agente no adivinaría

### 4.1 El icono se llama distinto en cada componente

Es la trampa principal del repositorio:

| Componente | Prop del icono |
| --- | --- |
| `Button` | `iconLeft` y `iconRight` — **no existe `icon`** |
| `Input` | `icon` (uno solo, siempre a la izquierda) |
| `Card` | `icon` |
| `Badge` | `icon` |

Escribir `<Button icon={IconPlus}>` es un error de compilación. Tampoco valen los nombres
habituales en otras librerías: `startIcon`/`endIcon`, `leftIcon`/`rightIcon`,
`iconPosition`. Hubo un `icon` + `iconPosition` en `Button` hasta el commit `106d89c`;
ya no.

El icono siempre se pasa **como componente**, no como texto ni como elemento:
`iconLeft={IconPlus}`, nunca `iconLeft="plus"` ni `iconLeft={<IconPlus />}`.

### 4.2 `Button` sin texto exige `aria-label`, y lo exige TypeScript

`src/components/Button.tsx:61-62` define `ButtonProps` como una unión: o lleva `children`,
o lleva `aria-label` obligatorio. Un botón de solo icono sin etiqueta **no compila**:

```
Property ''aria-label'' is missing in type ... but required
```

No es una convención ni un aviso en tiempo de ejecución: es el tipo.

### 4.3 Nombres de variante que no se solapan

- `Button`: `primary`, `secondary`, `ghost`, `danger`. No hay `outline`, `link`,
  `success` ni `destructive` (es `danger`).
- `Badge`: `neutral`, `info`, `success`, `warning`, `danger`. No hay `primary`, ni
  `default` (el neutro se llama `neutral`), ni `gray`.
- El tamaño por defecto de `Badge` es `sm`; el de `Button` e `Input`, `md`.

### 4.4 Props con nombre propio

| Prop | Componente | Lo que hay que saber |
| --- | --- | --- |
| `hint` | `Input` | No es `helperText`, `description` ni `helpText` |
| `error` | `Input` | Es un **string**, y además hace de interruptor: si hay texto, el campo se pinta de rojo. No existe un `invalid` aparte |
| `interactive` | `Card` | No es `clickable`, `hoverable` ni `onClick`. Y solo cambia el aspecto: ver 4.6 |
| `action` | `Card` | Zona superior derecha. Acepta cualquier contenido (`ReactNode`), no un texto |
| `footer` | `Card` | Franja inferior con línea separadora. También `ReactNode` |
| `fullWidth` | `Button` | Solo en `Button`. **Se ignora en modo solo icono** (`Button.tsx:101`) |

### 4.5 `Input` redefine la prop nativa `size`

`src/components/Input.tsx:28-29` hace `Omit<..., 'size'>` para quedarse con `size` como
`'sm' | 'md' | 'lg'`. En HTML, `size` en un `<input>` es un número de caracteres: pasar
`size={20}` da error de tipos.

### 4.6 `Card interactive` no es un botón

`src/components/Card.tsx:37-38` solo añade `cursor-pointer` y un cambio de borde y sombra
al pasar el ratón. La tarjeta sigue siendo un `<div>`: no recibe foco con el teclado, no
responde a Enter o Espacio y no se anuncia como elemento pulsable. Si hace falta que lo
sea, hay que añadirlo por fuera.

### 4.7 Qué hace `loading` exactamente

En `src/components/Button.tsx:106-116`:

- Sustituye **solo el icono izquierdo** por la rueda. Si hay `iconRight`, se queda.
- Desactiva el botón (`disabled || loading`, L92) y marca `aria-busy`.
- El texto no cambia: hay que pasar uno distinto ("Guardando") si se quiere.

### 4.8 Detalles del código

- Las constantes internas están en **español** (`VARIANTES`, `TAMANOS`, `RELLENO`,
  `CUADRADO`, `TAMANO_ICONO`, `SANGRIA_CON_ICONO`, `POSICION_ICONO`), mientras que las
  props son en inglés. Los nombres de las historias de Storybook también van en español
  (`Tamaños`, `Dos iconos`, `Solo icono`).
- `Badge` usa `ring-1 ring-inset` como borde; los demás usan `border`. Mezclar un `Badge`
  con un `Button secondary` da dos tipos de línea distintos.
- `Button` aplica las clases `outline-teal-600`, `outline-gray-500` y `outline-red-600`
  siempre, no bajo `focus-visible:`. Funciona porque el grosor es 0 hasta que recibe foco,
  pero leído por encima parece un borde permanente.
- No hay `forwardRef` en ningún componente: no se les puede pasar una `ref`.
- `Card` renderiza el bloque de contenido solo si hay `children` (L62); una `Card` con
  `title` y sin contenido no deja hueco vacío.

---

## 5. Prueba sin reglas

`src/screens/antes.tsx` es la primera pantalla construida con estos componentes, escrita
sin ninguna regla por encima: sin tokens con nombre, sin convención de nomenclatura
escrita y sin más componentes que los cuatro existentes. Sirve como experimento: lo que
salió mal aquí es lo que volverá a salir mal en cada pantalla nueva mientras no haya
reglas.

La pantalla **funciona y se ve bien**. El problema no es el resultado, es cómo está hecho
por dentro.

### 5.1 Valores escritos a mano

La pantalla introduce **8 clases de color** nuevas, ninguna con nombre, encima de las 49
que ya tenían los componentes:

| Archivo y línea | Valor | Problema |
| --- | --- | --- |
| `src/screens/antes.tsx:74` | `bg-teal-600 text-white` | Es exactamente el color de `Button variant="primary"` (`Button.tsx:10`), reescrito a mano. Si mañana el acento deja de ser `teal`, esta burbuja se queda atrás |
| `src/screens/antes.tsx:74` | `rounded-xl` | Copia el radio del contenedor de `Card` (`Card.tsx:36`). Los botones ya no usan ese radio: desde `daa11d3` son `rounded-full` |
| `src/screens/antes.tsx:74` | `px-4 py-3` | Relleno elegido a ojo. No coincide con el de `Card` (`p-5`, `Card.tsx:44`) ni con el de ningún tamaño de `Button` |
| `src/screens/antes.tsx:79` | `text-gray-700` | Tercer gris para texto de cuerpo. `Card` usa `text-gray-600` para su descripción (`Card.tsx:55`) e `Input` usa `text-gray-900` para el texto del campo (`Input.tsx:89`) |
| `src/screens/antes.tsx:85-86` | `text-xs text-gray-400` | La hora del mensaje. `gray-400` existe en el sistema, pero significando otra cosa: es el gris del placeholder y del icono de `Input` (`Input.tsx:78`, `Input.tsx:90`) |
| `src/screens/antes.tsx:106` | `text-sm text-gray-600` | Mismo papel que la descripción de `Card`, escrito otra vez en vez de reutilizado |
| `src/screens/antes.tsx:154` | `text-2xl font-bold text-gray-900` | **Ningún componente usa `text-2xl`.** Los cuatro se mueven entre `text-xs` y `text-base`. La pantalla inventa un escalón de titular que el sistema no tiene |
| `src/screens/antes.tsx:182` | `border-gray-200 bg-white` | El borde de la barra inferior. Repite el borde de `Card` (`Card.tsx:36` y `Card.tsx:69`) |

Y **11 medidas de hueco y tamaño** elegidas una a una, sin criterio compartido:
`gap-2`, `gap-3`, `max-w-lg` (L72), `max-w-md` (L99), `min-h-96` (L98 y L174),
`mt-1` (L85-86), `pb-6` (L152, L174), `px-4 py-3` (L74), `py-4` (L182), `space-y-4` (L105, L174).

`max-w-lg` para la burbuja y `max-w-md` para el estado vacío son dos anchos de lectura
distintos en la misma pantalla, sin ninguna razón detrás.

### 5.2 Componentes copiados en vez de usados

#### La burbuja de la persona, reimplementada — `src/screens/antes.tsx:73-81`

Las dos mitades de la misma conversación están construidas de dos maneras distintas:

- El mensaje del asistente (L78-80) usa `Card`.
- El mensaje de la persona (L74-76) es un `<div>` con clases a mano.

El resultado es que una conversación de dos voces tiene una voz dentro del design system
y la otra fuera. No existe ningún componente de burbuja, así que la mitad que no encajaba
en `Card` se resolvió copiando el aspecto de `Button primary`.

#### La barra inferior, reimplementada — `src/screens/antes.tsx:181-187`

```
sticky bottom-0 flex items-end gap-2 border-t border-gray-200 bg-white py-4
```

`Card` ya sabe dibujar exactamente eso: su prop `footer` es «una franja separada por una
línea» (`Card.tsx:68-70`, con `border-t border-gray-200 px-5 py-3`). La pantalla lo
rehace con otro relleno (`py-4` en vez de `py-3`), así que ahora hay dos franjas
inferiores que se parecen pero no son iguales.

#### El titular, reimplementado — `src/screens/antes.tsx:154`

`Card` tiene su propio titular (`Card.tsx:52`: `text-base font-semibold text-gray-900`).
La cabecera de la pantalla escribe otro (`text-2xl font-bold text-gray-900`). No hay
componente de texto ni escala de titulares, así que cada pantalla nueva inventará el
suyo.

#### Lo que sí se usó bien

`EstadoVacio` (L96-129) es el caso contrario: `Card` con `icon`, `title` y `description`,
y `Button` dentro. Cuando el componente cubre el caso, la pantalla lo usa. El problema
aparece justo donde no llega.

### 5.3 Nombres distintos de los de los componentes

Los componentes exponen sus props **en inglés** (`variant`, `size`, `iconLeft`,
`iconRight`, `label`, `hint`, `error`, `action`, `footer`, `interactive`, `loading`,
`fullWidth`) y usan nombres **en español** solo en sus constantes internas (`VARIANTES`,
`TAMANOS`). Esa regla no está escrita en ninguna parte, y la pantalla la rompe en cuanto
define sus propias piezas:

| Archivo y línea | Nombre usado | Lo que habría en el sistema |
| --- | --- | --- |
| `src/screens/antes.tsx:67` | prop `mensaje` | Las props públicas de los cuatro componentes están todas en inglés |
| `src/screens/antes.tsx:96`, `172` | prop `onElegir` | Ningún componente expone callbacks propios; los existentes son nativos (`onClick`, `onChange`). Un agente escribiría `onSelect` o `onChange` |
| `src/screens/antes.tsx:67`, `96`, `131` | componentes `Burbuja`, `EstadoVacio`, `Asistente` | `Button`, `Input`, `Card`, `Badge` están en inglés |
| `src/screens/antes.tsx:11` | `export const titulo` | La convención para registrar una pantalla es en español, mientras que las props de los componentes son en inglés |
| `src/screens/antes.tsx:15` | `de: 'persona' \| 'asistente'` | Nadie que venga de fuera adivinaría estos valores: la convención del sector es `role: 'user' \| 'assistant'` |

Hoy conviven, por tanto, tres vocabularios: props de componente en inglés, props de
pantalla en español, e internos en español.

#### Dos nombres del sistema que chirrían al usarlos

| Archivo y línea | Qué pasa |
| --- | --- |
| `src/screens/antes.tsx:196` | El botón de enviar es de solo icono, pero la prop se llama `iconLeft`. No hay nada a la izquierda de nada: es el único icono. `Button` no tiene un `icon` a secas (ver 4.1) |
| `src/screens/antes.tsx:155` | `Badge variant="success"` para decir «Disponible». `success` nombra un resultado («ha ido bien»), no un estado de presencia. Al no haber una variante para eso, se estira la que más se parece |

### 5.4 El patrón

Las tres categorías son la misma historia contada tres veces: **el design system cubre el
centro de la pantalla y no cubre los bordes.** Donde hay componente, la pantalla lo usa y
sale limpia. Donde no lo hay —la burbuja, el titular, la barra inferior, el ancho de
lectura, el nombre de una prop propia— quien escribe decide sobre la marcha, y decide
distinto cada vez.

Cada pantalla nueva añadirá su propia tanda de valores a mano y su propio vocabulario
mientras no existan: una capa de tokens con nombre, una escala de titulares, un
componente de burbuja y una convención de nomenclatura escrita.
