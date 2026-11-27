// Lee tokens/tokens.json tal cual y pinta cada grupo de primitivos.
// Ningún valor se copia aquí: si cambia el JSON, cambia la página.
import type { CSSProperties, ReactNode } from 'react'
import tokens from '../../tokens/tokens.json'

type Dimension = { value: number; unit: 'px' | 'rem' }
type Color = {
  colorSpace: 'oklch' | 'srgb'
  components: [number, number, number]
  alpha?: number
  hex: string
}
type Token<T> = { $value: T; $description?: string }

const esNumero = (clave: string) => /^\d+$/.test(clave)

/**
 * Las entradas de un grupo, sin las claves que empiezan por $ ($type, $description).
 * JavaScript pone las claves como «100» delante de «050», así que se reordenan:
 * primero las numéricas de menor a mayor y después el resto (full, xs, sm…) en su orden.
 */
function entradas<T>(grupo: object): [string, Token<T>][] {
  const lista = Object.entries(grupo).filter(([clave]) => !clave.startsWith('$')) as [
    string,
    Token<T>,
  ][]
  return lista.sort(([a], [b]) => {
    if (esNumero(a) && esNumero(b)) return Number(a) - Number(b)
    return Number(esNumero(b)) - Number(esNumero(a))
  })
}

const css = {
  color(c: Color): string {
    const [a, b, d] = c.components
    if (c.colorSpace === 'oklch') return `oklch(${a} ${b} ${d})`
    return `rgb(${a * 255} ${b * 255} ${d * 255} / ${c.alpha ?? 1})`
  },
  dim: (d: Dimension) => `${d.value}${d.unit}`,
  px: (d: Dimension) => (d.unit === 'rem' ? d.value * 16 : d.value),
}

// El marco de la página también sale de los tokens.
const gris = tokens.color.gray as unknown as Record<string, Token<Color>>
const tinta = css.color(gris['900'].$value)
const tintaSuave = css.color(gris['500'].$value)
const linea = css.color(gris['200'].$value)
const fondo = css.color(gris['50'].$value)
const acento = css.color((tokens.color.brand as unknown as Record<string, Token<Color>>)['500'].$value)
const mono = (tokens['font-family'].mono.$value as string[]).join(', ')
const sans = (tokens['font-family'].sans.$value as string[])
  .map((f) => (f.includes(' ') ? `'${f}'` : f))
  .join(', ')

const etiqueta: CSSProperties = { fontFamily: mono, fontSize: 12, color: tinta }
const valor: CSSProperties = { fontFamily: mono, fontSize: 12, color: tintaSuave }

function Fila({ nombre, detalle, children }: { nombre: string; detalle: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '9rem 9rem 1fr',
        alignItems: 'center',
        gap: 16,
        padding: '8px 0',
        borderBottom: `1px solid ${linea}`,
      }}
    >
      <span style={etiqueta}>{nombre}</span>
      <span style={valor}>{detalle}</span>
      <div>{children}</div>
    </div>
  )
}

const detalleDim = (d: Dimension) =>
  d.unit === 'rem' ? `${d.value}rem · ${css.px(d)}px` : `${d.value}px`

/* ---------- Color ---------- */

export function Colores() {
  const paletas = entradas<never>(tokens.color) as unknown as [string, Record<string, Token<Color>>][]
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      {paletas.map(([nombre, paleta]) => (
        <div key={nombre}>
          <div style={{ ...etiqueta, fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
            color.{nombre}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(5.5rem, 1fr))',
              gap: 8,
            }}
          >
            {entradas<Color>(paleta).map(([paso, token]) => (
              <div key={paso}>
                <div
                  style={{
                    height: 56,
                    borderRadius: 8,
                    background: css.color(token.$value),
                    border: `1px solid ${linea}`,
                  }}
                />
                <div style={{ ...etiqueta, marginTop: 4 }}>{paso}</div>
                <div style={valor}>{token.$value.hex}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Espaciado ---------- */

export function Espaciado() {
  return (
    <div>
      {entradas<Dimension>(tokens.spacing).map(([nombre, t]) => (
        <Fila key={nombre} nombre={`spacing.${nombre}`} detalle={detalleDim(t.$value)}>
          <div style={{ height: 16, width: css.dim(t.$value), background: acento, borderRadius: 2 }} />
        </Fila>
      ))}
    </div>
  )
}

/* ---------- Radios ---------- */

export function Radios() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {entradas<Dimension>(tokens.radius).map(([nombre, t]) => (
        <div key={nombre} style={{ width: 96 }}>
          <div
            style={{
              height: 64,
              background: fondo,
              border: `2px solid ${acento}`,
              borderRadius: css.dim(t.$value),
            }}
          />
          <div style={{ ...etiqueta, marginTop: 4 }}>radius.{nombre}</div>
          <div style={valor}>{nombre === 'full' ? '9999px' : detalleDim(t.$value)}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Bordes ---------- */

export function Bordes() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {entradas<Dimension>(tokens['border-width']).map(([nombre, t]) => (
        <div key={nombre} style={{ width: 120 }}>
          <div
            style={{
              height: 64,
              borderRadius: 8,
              border: `${css.dim(t.$value)} solid ${tinta}`,
              background: fondo,
            }}
          />
          <div style={{ ...etiqueta, marginTop: 4 }}>border-width.{nombre}</div>
          <div style={valor}>{detalleDim(t.$value)}</div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Texto ---------- */

const ejemplo = 'Tu próxima cita es el martes a las 10:30'

export function Familias() {
  return (
    <div>
      {entradas<string[]>(tokens['font-family']).map(([nombre, t]) => (
        <Fila key={nombre} nombre={`font-family.${nombre}`} detalle={t.$value[0]}>
          <span
            style={{
              fontFamily: t.$value.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', '),
              fontSize: 20,
              color: tinta,
            }}
          >
            {ejemplo}
          </span>
        </Fila>
      ))}
    </div>
  )
}

export function Tamanos() {
  return (
    <div>
      {entradas<Dimension>(tokens['font-size']).map(([nombre, t]) => (
        <Fila key={nombre} nombre={`font-size.${nombre}`} detalle={detalleDim(t.$value)}>
          <span style={{ fontFamily: sans, fontSize: css.dim(t.$value), color: tinta, lineHeight: 1.2 }}>
            {ejemplo}
          </span>
        </Fila>
      ))}
    </div>
  )
}

export function Pesos() {
  return (
    <div>
      {entradas<number>(tokens['font-weight']).map(([nombre, t]) => (
        <Fila key={nombre} nombre={`font-weight.${nombre}`} detalle={String(t.$value)}>
          <span style={{ fontFamily: sans, fontSize: 20, fontWeight: t.$value, color: tinta }}>
            {ejemplo}
          </span>
        </Fila>
      ))}
    </div>
  )
}

export function Interlineados() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(14rem, 1fr))', gap: 16 }}>
      {entradas<Dimension>(tokens['line-height']).map(([nombre, t]) => (
        <div key={nombre}>
          <div style={etiqueta}>line-height.{nombre}</div>
          <div style={{ ...valor, marginBottom: 4 }}>{detalleDim(t.$value)}</div>
          <p
            style={{
              margin: 0,
              fontFamily: sans,
              fontSize: 14,
              lineHeight: css.dim(t.$value),
              color: tinta,
              // Rayas cada línea para que se vea la altura de cada renglón.
              backgroundImage: `repeating-linear-gradient(to bottom, ${fondo} 0 ${css.dim(t.$value)}, transparent ${css.dim(t.$value)} calc(2 * ${css.dim(t.$value)}))`,
            }}
          >
            Recuerda tomar la medicación después del desayuno y apuntar cómo te encuentras.
          </p>
        </div>
      ))}
    </div>
  )
}

/* ---------- Sombras ---------- */

export function Sombras() {
  const { offset, blur, color } = tokens.shadow
  const desplazamientos = entradas<Dimension>(offset)
  const desenfoques = entradas<Dimension>(blur)
  const colores = entradas<Color>(color)

  // Muestras: cada desplazamiento con el desenfoque del doble, y dos opacidades.
  const muestras = desplazamientos
    .filter(([n]) => n !== '0')
    .flatMap(([o, ot]) => {
      const b = desenfoques.find(([n]) => Number(n) === Number(o) * 2)
      if (!b) return []
      return colores
        .filter(([n]) => n !== '5')
        .map(([c, ct]) => ({
          nombre: `offset.${o} · blur.${b[0]} · color.${c}`,
          sombra: `0 ${css.dim(ot.$value)} ${css.dim(b[1].$value)} ${css.color(ct.$value)}`,
        }))
    })

  const lista = (titulo: string, filas: [string, string][]) => (
    <div>
      <div style={{ ...etiqueta, fontWeight: 600, marginBottom: 4 }}>{titulo}</div>
      {filas.map(([n, v]) => (
        <div key={n} style={valor}>
          {n} · {v}
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
        {lista('shadow.offset', desplazamientos.map(([n, t]) => [n, detalleDim(t.$value)]))}
        {lista('shadow.blur', desenfoques.map(([n, t]) => [n, detalleDim(t.$value)]))}
        {lista('shadow.color', colores.map(([n, t]) => [n, `negro al ${(t.$value.alpha ?? 1) * 100} %`]))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {muestras.map((m) => (
          <div key={m.nombre} style={{ width: 160 }}>
            <div style={{ height: 80, borderRadius: 12, background: fondo, boxShadow: m.sombra }} />
            <div style={{ ...valor, marginTop: 12 }}>{m.nombre}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Breakpoints ---------- */

export function Breakpoints() {
  const lista = entradas<Dimension>(tokens.breakpoint)
  const maximo = Math.max(...lista.map(([, t]) => css.px(t.$value)))
  return (
    <div>
      {lista.map(([nombre, t]) => (
        <Fila key={nombre} nombre={`breakpoint.${nombre}`} detalle={detalleDim(t.$value)}>
          <div
            style={{
              height: 16,
              width: `${(css.px(t.$value) / maximo) * 100}%`,
              background: acento,
              borderRadius: 2,
            }}
          />
        </Fila>
      ))}
    </div>
  )
}
