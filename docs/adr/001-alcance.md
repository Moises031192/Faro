# ADR-001 · Alcance y principios

- **Estado:** Aceptado · principio 2 ampliado por [ADR-002](002-pantallas-solo-faro-ds.md)
- **Fecha:** 2026-11-26
- **Autor:** Moisés ([@Moises031192](https://github.com/Moises031192))

> Un ADR (*Architecture Decision Record*, «registro de decisión») es un documento corto
> que deja por escrito una decisión importante, por qué se tomó y qué implica. Este es el
> primero: fija qué es Faro DS y las reglas con las que se construye.

---

## Contexto

**Faro** es una app de salud. Cada persona entra en su portal y ve sus recetas y
medicación, sus análisis y chequeos y sus citas; puede grabar consultas y tomar notas,
hablar con un agente de IA sobre cómo se siente y fijarse objetivos anuales de
revisiones. Todo ello se resume en un **panel de datos y métricas**.

**Faro DS** es el design system con el que se construye esa app: los componentes, los
tokens (valores visuales con nombre propio, como «color principal») y los patrones de
uso. Hoy tiene cuatro componentes (`Button`, `Badge`, `Input` y `Card`), construidos con
React, TypeScript, Tailwind y Tabler Icons.

La auditoría del sistema ([`docs/audit.md`](../audit.md)) describe cómo está hecho y
encuentra cinco problemas de fondo:

1. **No hay tokens.** Los componentes tienen 49 clases de color escritas a mano y la
   primera pantalla añade 8 más (secciones 3.1 y 5.1). Cambiar el color principal obliga
   a tocar varios archivos, y aun así quedan dos verdes distintos (`teal` y `emerald`)
   para ideas casi iguales.
2. **Las pantallas copian componentes en vez de usarlos.** La burbuja del chat, la barra
   inferior y el titular de `src/screens/antes.tsx` imitan el aspecto de `Button` y
   `Card` con clases sueltas (sección 5.2).
3. **Nombres que no coinciden.** El icono se llama `icon` en tres componentes e
   `iconLeft`/`iconRight` en el cuarto (sección 4.1). Además conviven tres vocabularios:
   props en inglés, props de pantalla en español e internos en español (sección 5.3).
4. **Accesibilidad irregular.** `Button` muestra el foco solo al navegar con teclado e
   `Input` también al hacer clic (sección 3.5). Una `Card` marcada como `interactive`
   parece pulsable pero no se puede usar con el teclado (sección 4.6).
5. **Colores de estado usados fuera de su significado.** «Disponible» se pinta con
   `success`, que significa «ha ido bien» (sección 5.3). En una app de salud, el color
   transmite si algo es preocupante o no.

Nada de esto rompe la app hoy, pero cada pantalla nueva repetirá estos problemas mientras
no haya reglas escritas. Este ADR fija esas reglas.

---

## Decisión

### Alcance

**Dentro del alcance:**

- **Una sola app: Faro.** Faro DS existe para servir a esta app, no como librería
  genérica para otros productos.
- **Una sola marca.** Una identidad visual, sin versiones para otras empresas ni
  personalizaciones de marca.
- **Solo web, con React.** El sistema se diseña primero para el móvil (pantalla pequeña)
  y se adapta después a pantallas grandes.
- **Modo claro y modo oscuro** desde el principio: cada token tiene un valor para cada
  modo.
- **Componentes propios**, escritos desde cero en React y TypeScript.
- **Tailwind** para los estilos, con los tokens definidos en su bloque `@theme`.
- **Tabler Icons** como única fuente de iconos.
- **Componentes de salud y de datos**: medicación, análisis, citas, notas, conversación
  con el agente, objetivos de revisión y el panel de métricas.

**Fuera del alcance:**

- Apps nativas de iPhone o Android.
- Otros frameworks distintos de React (Vue, Angular, Svelte…).
- Librerías de componentes de terceros (MUI, Chakra, Radix, shadcn…).
- Otras familias de iconos.
- Varias marcas o temas de marca blanca.

### Idioma

- **En inglés**, todo lo que usa quien monta una pantalla: nombres de componentes, props
  y sus valores (`<Button variant="primary" size="md">`).
- **En español**, la documentación, los textos que ve la persona usuaria, los commits y
  las PR.

### Principios

Cada principio dice cómo se comprueba: **revisando el código** o **mirándolo en
Storybook**. Así una PR se puede aceptar o corregir sin discutir interpretaciones.

#### 1. Todo valor visual sale de un token

Ningún componente ni pantalla escribe a mano un color, espaciado, radio, sombra, tamaño
de texto, ni tamaño o grosor de icono. Los valores se definen solo en el bloque `@theme`
de `src/index.css`, con nombres que dicen su papel (`primary`, `danger`, `surface`,
`text-muted`) y no su color (`teal-600`). Las clases de escala de Tailwind (`gap-4`,
`rounded-lg`, `text-sm`) están permitidas, porque leen la escala definida en `@theme`.

**Cómo se comprueba (revisando el código).** En `src/`, salvo `src/index.css`, no aparece:

- ninguna clase con un color de la paleta de Tailwind (`teal-600`, `gray-200`, `red-50`…),
  ni `white` ni `black`;
- ningún color escrito como hexadecimal, `rgb()` o `hsl()`;
- ningún valor entre corchetes (`p-[18px]`, `text-[#333]`);
- ningún número suelto en las props `size` o `stroke` de un icono de Tabler. Esos valores
  salen de una constante compartida de tamaños de icono.

#### 2. Las pantallas colocan; los componentes pintan

Una pantalla solo decide dónde va cada componente. Todo lo que da aspecto (color, borde,
radio, sombra, tipografía) vive en un componente de `src/components/`. Si una pantalla
necesita un aspecto que ningún componente ofrece, primero se crea o se amplía el
componente.

**Cómo se comprueba (revisando el código).** En `src/screens/` no hay atributos `style`,
y solo se usan clases de colocación:

- disposición: `flex`, `grid`, `gap-*`, `space-*`, `items-*`, `justify-*`, `self-*`,
  `order-*`, `col-*`, `row-*`;
- medidas y márgenes: `p*-*`, `m*-*`, `w-*`, `h-*`, `size-*`, `min-*`, `max-*`;
- posición: `relative`, `absolute`, `sticky`, `fixed`, `inset-*`, `top-*`, `bottom-*`,
  `left-*`, `right-*`, `z-*`;
- visibilidad: `hidden`, `block`, `overflow-*`, `sr-only`.

Cualquier otra clase en una pantalla incumple el principio.

#### 3. Accesible por defecto

La referencia es WCAG 2.2 AA (la norma internacional de accesibilidad web, nivel
intermedio). Como la norma entera no se puede revisar a mano en cada PR, el principio
se concreta en estas comprobaciones, que se hacen en **modo claro y en modo oscuro**.

**Cómo se comprueba (mirándolo en Storybook), en cada historia:**

- El panel de accesibilidad (*Accessibility*) no muestra infracciones. Ese panel revisa,
  entre otras cosas, que el texto tenga un contraste de al menos 4,5:1 con su fondo.
- Al recorrerla con el tabulador se llega a todo lo pulsable, en un orden lógico y con
  el foco visible. Enter activa el elemento, y Espacio también si es un botón.
- Al hacer clic con el ratón **no** aparece el anillo de foco: solo se muestra al
  navegar con el teclado.
- Con la herramienta de medir de Storybook, toda zona pulsable mide al menos 24 × 24 px.

**Y revisando el código:** un control sin texto visible no compila sin `aria-label`,
como ya ocurre en `Button`.

#### 4. Un mismo concepto, un mismo nombre

Las props que se repiten entre componentes se llaman igual, aceptan los mismos valores y
tienen el mismo valor por defecto. Esta es la lista cerrada:

| Prop | Valores | Por defecto |
| --- | --- | --- |
| `size` | `sm`, `md`, `lg` (o una parte de ellos) | `md` |
| `icon` | Un componente de Tabler: `icon={IconPlus}` | — |
| `iconEnd` | Un segundo icono al final, también como componente | — |
| `variant` | Solo nombres de este vocabulario: `primary`, `secondary`, `ghost`, `neutral`, `info`, `success`, `warning`, `danger` | Según el componente |
| `disabled` | `true` / `false` (la prop nativa) | `false` |
| `label`, `hint`, `error` | Texto. En todo campo de formulario: etiqueta, ayuda y mensaje de error | — |

Para añadir una prop compartida o un valor de `variant` hace falta un nuevo ADR.

**Cómo se comprueba (revisando el código).** El tipo de props de cada componente de
`src/components/` se compara con la tabla. Incumple:

- un nombre distinto para la misma idea (`leftIcon`, `helperText`, `destructive`);
- un valor que no está en la tabla;
- un valor por defecto distinto.

#### 5. Calma en la información de salud

Cada variante de estado tiene un significado fijo y se usa solo para eso:

| Variante | Significa | Ejemplos en Faro |
| --- | --- | --- |
| `success` | Algo ha terminado bien, o un valor está dentro de su rango | Cita confirmada, análisis en rango |
| `info` | Un dato neutro que no pide ninguna acción | Hay una nota nueva de la consulta |
| `warning` | Hay que atender algo pronto, pero no es urgente | Quedan pocas pastillas, revisión anual pendiente |
| `danger` | Un problema que la persona debe atender, o una acción que no se puede deshacer | Valor fuera de rango, error al guardar, borrar una nota |

Cualquier otro estado («Disponible», «Nuevo», «Borrador») usa `neutral`. El color nunca
es la única señal.

**Cómo se comprueba:**

- **Revisando el código:** cada uso de `variant="success"`, `"info"`, `"warning"` o
  `"danger"` en `src/` encaja con una fila de la tabla.
- **Mirándolo en Storybook:** toda historia con una variante de estado muestra un texto
  (o un icono con `aria-label`) que dice lo mismo que el color. Con el simulador de
  visión de Storybook en escala de grises, se entiende igual.

### Resumen: cómo se comprueba cada principio

| Principio | Qué se comprueba | Dónde |
| --- | --- | --- |
| 1. Todo valor visual sale de un token | No hay colores de la paleta, `white`/`black`, hexadecimales, valores entre corchetes ni números sueltos en los iconos fuera de `src/index.css` | Revisando el código |
| 2. Las pantallas colocan; los componentes pintan | En `src/screens/` solo hay clases de la lista de colocación y ningún `style` | Revisando el código |
| 3. Accesible por defecto | Panel de accesibilidad sin infracciones, recorrido con teclado, foco solo con teclado y zonas de 24 × 24 px, en modo claro y oscuro | Mirándolo en Storybook (y `aria-label` obligatorio, revisando el código) |
| 4. Un mismo concepto, un mismo nombre | Las props de cada componente coinciden en nombre, valores y valor por defecto con la tabla del principio | Revisando el código |
| 5. Calma en la información de salud | Cada variante de estado se usa con su significado de la tabla y siempre va con texto | Revisando el código y mirándolo en Storybook |

---

## Consecuencias

### Lo que ganamos

- **Un cambio, un sitio.** Cambiar el color principal, el radio o el modo oscuro se hace
  en los tokens y llega a todos los componentes y pantallas a la vez.
- **Revisiones más rápidas y objetivas.** Cada principio dice cómo comprobarlo, así que
  una PR se acepta o se corrige con criterios claros, no por gusto.
- **Pantallas más fáciles de montar**, tanto para personas como para agentes de IA:
  nombres previsibles y piezas que cubren los casos reales.
- **Confianza.** Una interfaz coherente y calmada transmite seriedad, algo necesario
  cuando se manejan datos de salud.

### Lo que cuesta

- **Rehacer lo que ya existe.** Los cuatro componentes y `src/screens/antes.tsx`
  incumplen hoy los principios 1, 2 y 4. Hay que crear la capa de tokens y adaptarlos.
- **Cambios que rompen el uso actual de algunos componentes.** El principio 4 obliga a
  sustituir en `Button` `iconLeft` por `icon` e `iconRight` por `iconEnd`, y a poner
  `md` como tamaño por defecto de `Badge` (hoy es `sm`). Hay que actualizar cada sitio
  donde se usan.
- **La pantalla del asistente incumple el principio 5:** «Disponible» usa
  `Badge variant="success"` y tiene que pasar a `neutral`.
- **Más componentes antes de más pantallas.** La burbuja del chat, la barra inferior y
  una escala de titulares tienen que existir como componentes antes de seguir montando
  pantallas.
- **Doble trabajo en el diseño de cada color**, porque cada token necesita un valor
  claro y otro oscuro que cumplan los contrastes.
- **Menos libertad puntual.** Si una pantalla necesita algo que el sistema no tiene, hay
  que añadirlo al sistema primero, aunque sea más lento que escribir una clase a mano.

### Siguientes pasos

1. Crear la capa de tokens en `src/index.css` (color con modo claro y oscuro,
   espaciado, radios, sombras, tipografía y tamaños de icono).
2. Pasar los cuatro componentes a tokens, con una constante compartida para los
   tamaños de icono, y adaptarlos a la tabla de props del principio 4.
3. Añadir a Storybook un selector de modo claro y oscuro, para poder hacer las
   comprobaciones del principio 3 en los dos modos.
4. Crear los componentes que faltan para la pantalla del asistente y rehacer
   `src/screens/antes.tsx` con ellos.
5. Añadir a `docs/componentes.md` las columnas que reflejen estos principios.
6. Actualizar el `README.md`, que sigue describiendo un repositorio sin código.

Cualquier cambio de alcance o de principios se hará con un nuevo ADR que sustituya a
este, no editándolo.
