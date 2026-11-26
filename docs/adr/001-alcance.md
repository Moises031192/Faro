# ADR-001 · Alcance y principios

- **Estado:** Aceptado
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

Cada principio dice cómo se comprueba, para que se pueda revisar en cada PR sin
discutir interpretaciones.

#### 1. Todo valor visual sale de un token

Ningún componente ni pantalla escribe a mano un color, espaciado, radio, sombra, tamaño
de texto o tamaño de icono. Todos salen de un token con nombre que dice su papel
(`primary`, `danger`, `surface`, `text-muted`), no su color (`teal-600`).

**Cómo se comprueba:** en `src/` no aparece ninguna clase de la paleta de Tailwind
(`teal-*`, `gray-*`, `red-*`…), ningún color hexadecimal, ningún valor entre corchetes
(`[16px]`) ni ningún número suelto como tamaño o grosor de icono. Solo `src/index.css`
define valores.

#### 2. Lo que se repite es un componente

Si una pantalla necesita algo que se parece a un componente, usa ese componente. Si no
existe, se crea en `src/components/` antes de usarlo; no se imita con clases sueltas.

**Cómo se comprueba:** las pantallas de `src/screens/` solo usan clases de Tailwind para
colocar elementos (`flex`, `gap-*`, `grid`, anchos máximos). No contienen clases de
color, borde, radio, sombra ni tipografía.

#### 3. Accesible por defecto

Todo cumple WCAG 2.2 AA (la norma internacional de accesibilidad web, nivel intermedio)
en modo claro y en modo oscuro.

**Cómo se comprueba:**

- El panel de accesibilidad de Storybook no muestra errores en ninguna historia.
- El texto tiene un contraste de al menos 4,5:1 con su fondo, y los bordes e iconos con
  significado, de al menos 3:1.
- Todo lo pulsable se alcanza con el tabulador, responde a Enter (y a Espacio si es un
  botón) y muestra el foco con `focus-visible`.
- Las zonas pulsables miden al menos 24 × 24 px.
- Un control sin texto visible no compila sin `aria-label`, como ya ocurre en `Button`.

#### 4. Un mismo concepto, un mismo nombre

Si dos componentes tienen la misma idea, la prop se llama igual, acepta los mismos
valores y tiene el mismo valor por defecto.

**Cómo se comprueba:** `docs/componentes.md` incluye la lista de props compartidas
(`variant`, `size`, `icon`, `disabled`…) con sus valores permitidos, y cada PR que
añade o cambia un componente se revisa contra esa lista. En concreto: el icono se llama
`icon` en todos los componentes, y los tamaños son siempre `sm`, `md` y `lg`, con `md`
por defecto.

#### 5. Calma en la información de salud

Los colores y los iconos de alerta (`danger`, `warning`) significan siempre lo mismo:
hay un problema que la persona debe atender. Nunca se usan para decorar, para llamar la
atención ni para estados que no lo son. El color nunca es la única señal.

**Cómo se comprueba:**

- Cada token de estado tiene escrito en su definición qué significa y cuándo se usa.
- Todo elemento con color de estado tiene también un texto o un icono que diga lo mismo
  (un `Badge danger` siempre lleva palabra; nunca hay solo un punto rojo).
- No se usa `success`, `warning` ni `danger` para nada que no sea un resultado o un
  aviso; para otros estados se crea una variante propia.

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
- **Un cambio que rompe el uso actual de `Button`.** Unificar el nombre del icono obliga
  a sustituir `iconLeft`/`iconRight` por `icon` (más una forma de indicar el icono
  derecho) y a actualizar cada sitio donde se usa.
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
2. Pasar los cuatro componentes a tokens y unificar la prop del icono.
3. Crear los componentes que faltan para la pantalla del asistente y rehacer
   `src/screens/antes.tsx` con ellos.
4. Añadir a `docs/componentes.md` las columnas que reflejen estos principios.
5. Actualizar el `README.md`, que sigue describiendo un repositorio sin código.

Cualquier cambio de alcance o de principios se hará con un nuevo ADR que sustituya a
este, no editándolo.
