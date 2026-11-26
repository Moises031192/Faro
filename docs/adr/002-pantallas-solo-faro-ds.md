# ADR-002 · Las pantallas solo usan Faro DS

- **Estado:** Aceptado
- **Fecha:** 2026-11-26
- **Autor:** Moisés ([@Moises031192](https://github.com/Moises031192))
- **Amplía:** [ADR-001 · Alcance y principios](001-alcance.md), principio 2

---

## Contexto

El principio 2 del ADR-001 («Las pantallas colocan; los componentes pintan») prohíbe que
una pantalla le dé aspecto propio a nada: en `src/screens/` solo hay clases de
colocación y ningún atributo `style`.

Pero no dice **con qué piezas** se construye una pantalla. Esto cumpliría hoy el
principio 2 sin usar Faro DS en absoluto:

```tsx
<h1>Mis citas</h1>
<p>Tienes 2 citas esta semana.</p>
<button onClick={pedirCita}>Pedir cita</button>
```

No lleva ninguna clase prohibida, pero el titular, el párrafo y el botón son los
elementos básicos de HTML. El botón no tiene el aspecto de `Button` ni sus garantías
de accesibilidad, y el texto se queda con el estilo por defecto del navegador. Cada
pantalla acabaría resolviendo el texto y los controles a su manera, que es justo lo que
encontró la auditoría ([`docs/audit.md`](../audit.md), sección 5) en
`src/screens/antes.tsx`:

- el titular es un `<h1>` con clases propias (`antes.tsx:154`);
- los textos son `<p>` con tres grises distintos (`antes.tsx:79` y `106`);
- la burbuja de la persona es un `<div>` que imita a `Button` (`antes.tsx:74`).

Además, hoy Faro DS **no tiene componentes de texto**, así que una pantalla no puede
escribir un titular o un párrafo sin salirse del sistema.

---

## Decisión

**Una pantalla de Faro se construye solo con piezas de Faro DS.** Todo lo que la persona
ve, lee, pulsa o rellena es un componente de `src/components/`. La pantalla solo decide
qué componentes usa, en qué orden y dónde van.

### Qué es una pantalla

Todo archivo de `src/screens/`. `App.tsx`, `ComponentsPreview.tsx` y
`TailwindTokens.tsx` son herramientas para ver el design system mientras se construye,
no pantallas de Faro, y quedan fuera de esta regla.

### Las cinco reglas

#### 1. Solo se importa de Faro DS

Una pantalla solo puede importar de:

| Origen | Para qué |
| --- | --- |
| `../components` (el índice de Faro DS) | Todas las piezas visibles |
| `react` | Estado y lógica (`useState`, `useEffect`…) |
| `@tabler/icons-react` | Iconos, **solo** para pasarlos como prop a un componente |
| `../lib/` | Lógica sin nada visible: cálculos, fechas, datos |

No se importa de archivos sueltos de `src/components/` (siempre del índice), ni de
otras pantallas, ni de ningún otro paquete.

#### 2. Los elementos de HTML solo agrupan

Solo se permiten estos elementos de HTML, y solo para agrupar y dar estructura:

`div`, `main`, `section`, `article`, `aside`, `header`, `footer`, `nav`, `ul`, `ol`,
`li`, `form`.

Cualquier otro elemento (`h1`…`h6`, `p`, `span`, `strong`, `a`, `button`, `input`,
`label`, `img`, `svg`, `table`…) está prohibido en una pantalla: su papel lo cumple un
componente de Faro DS.

#### 3. No hay texto suelto

Todo texto visible está dentro de un componente de Faro DS: un titular en `Heading`, un
párrafo en `Text`, la etiqueta de un botón en `Button`, etc. Un texto escrito
directamente dentro de un `div`, `li` o cualquier otro elemento de la regla 2 incumple
la regla.

#### 4. Los iconos van dentro de un componente

Un icono de Tabler nunca se dibuja directamente en una pantalla (`<IconPlus />`). Se pasa
como prop a un componente (`<Button icon={IconPlus}>`), que decide su tamaño, su grosor
y su color.

#### 5. Si falta una pieza, se crea en Faro DS primero

Si una pantalla necesita algo que Faro DS no tiene, se crea en `src/components/` antes
de usarlo, en la misma PR o en una anterior, con:

- su historia en Storybook (`*.stories.tsx`);
- su fila en `docs/componentes.md`;
- cumpliendo los principios del ADR-001.

Una pantalla puede definir sus propios componentes internos solo para **agrupar**
piezas de Faro DS (como `EstadoVacio` en `antes.tsx`), y esos componentes internos
cumplen estas mismas reglas. Si el mismo agrupamiento hace falta en una segunda
pantalla, se convierte en componente de Faro DS: una pantalla no importa de otra.

### Cómo se comprueba

Todo se comprueba **revisando el código** de cada archivo de `src/screens/`:

| Regla | Qué se comprueba |
| --- | --- |
| 1. Solo se importa de Faro DS | Cada `import` viene de `../components`, `react`, `@tabler/icons-react` o `../lib/` |
| 2. Los elementos de HTML solo agrupan | Cada etiqueta en minúsculas del JSX está en la lista permitida |
| 3. No hay texto suelto | Ningún elemento de la lista permitida tiene texto escrito directamente dentro |
| 4. Los iconos van dentro de un componente | Ningún `<Icon… />` aparece como etiqueta; los iconos solo aparecen como valor de una prop |
| 5. Si falta una pieza, se crea en Faro DS primero | Cada componente de `src/components/` tiene su `*.stories.tsx` y su fila en `docs/componentes.md`, y ninguna pantalla importa de otra |

---

## Consecuencias

### Lo que ganamos

- **Todas las pantallas se ven y se comportan igual**, porque todas están hechas de las
  mismas piezas.
- **La accesibilidad viene incluida.** Si `Button`, `Heading` o `Link` son accesibles,
  todas las pantallas que los usan también lo son, sin repetir el trabajo.
- **Un cambio en Faro DS llega a toda la app**, sin buscar copias escondidas en las
  pantallas.
- **Revisar una pantalla es mecánico**: lista de imports, lista de etiquetas y nada de
  texto suelto.
- **Más fácil para los agentes de IA**: tienen un catálogo cerrado de piezas y no
  tienen que inventar nada.

### Lo que cuesta

- **Faltan componentes básicos** antes de poder cumplir la regla:
  - `Heading`: titulares, con su nivel (`h1`…`h6`) y la escala de tamaños de los tokens;
  - `Text`: párrafos y textos secundarios;
  - `Link`: enlaces.
- **La pantalla del asistente (`src/screens/antes.tsx`) incumple las reglas 2, 3 y 5.**
  Tiene `<h1>`, `<p>` y la burbuja del chat hechos a mano, así que necesita también una
  burbuja de mensaje y una barra para escribir como componentes de Faro DS.
- **Más trabajo al empezar cada pantalla nueva** si le falta una pieza: hay que crearla
  en Faro DS, con su historia y su documentación, antes de usarla.

### Siguientes pasos

1. Crear `Heading`, `Text` y `Link` en Faro DS, con sus historias y su fila en
   `docs/componentes.md`.
2. Crear los componentes de la conversación (burbuja de mensaje y barra para escribir).
3. Rehacer `src/screens/antes.tsx` cumpliendo el ADR-001 y este ADR.
