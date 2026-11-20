import {
  IconAlertTriangle,
  IconCalendarEvent,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconDotsVertical,
  IconDownload,
  IconFlask,
  IconMail,
  IconPencil,
  IconPill,
  IconPlus,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react'
import { Badge, Button, Card, Input } from './components'

function Bloque({
  titulo,
  descripcion,
  children,
}: {
  titulo: string
  descripcion: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t border-gray-200 py-10">
      <h2 className="text-xl font-semibold text-gray-900">{titulo}</h2>
      <p className="mt-1 max-w-2xl text-sm text-gray-600">{descripcion}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Fila({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="w-24 shrink-0 text-xs text-gray-500">{etiqueta}</span>
      {children}
    </div>
  )
}

export function ComponentsPreview() {
  return (
    <>
      <Bloque
        titulo="Button"
        descripcion="Cuatro variantes, tres tamaños y un icono opcional a izquierda o derecha."
      >
        <div className="space-y-5">
          <Fila etiqueta="variantes">
            <Button>Guardar</Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="ghost">Ver más</Button>
            <Button variant="danger" iconLeft={IconTrash}>
              Eliminar
            </Button>
          </Fila>
          <Fila etiqueta="tamaños">
            <Button size="sm" iconLeft={IconPlus}>
              Pequeño
            </Button>
            <Button size="md" iconLeft={IconPlus}>
              Mediano
            </Button>
            <Button size="lg" iconLeft={IconPlus}>
              Grande
            </Button>
          </Fila>
          <Fila etiqueta="iconos">
            <Button iconLeft={IconDownload}>A la izquierda</Button>
            <Button variant="secondary" iconRight={IconChevronRight}>
              A la derecha
            </Button>
            <Button
              variant="secondary"
              iconLeft={IconCalendarEvent}
              iconRight={IconChevronDown}
            >
              Los dos lados
            </Button>
          </Fila>
          <Fila etiqueta="solo icono">
            <Button iconLeft={IconPlus} aria-label="Añadir medicación" />
            <Button
              variant="secondary"
              iconLeft={IconPencil}
              aria-label="Editar"
            />
            <Button
              variant="ghost"
              iconLeft={IconDotsVertical}
              aria-label="Más opciones"
            />
            <Button
              variant="danger"
              iconLeft={IconTrash}
              aria-label="Eliminar"
            />
          </Fila>
          <Fila etiqueta="estados">
            <Button loading>Guardando</Button>
            <Button disabled>Desactivado</Button>
            <Button variant="secondary" disabled>
              Desactivado
            </Button>
          </Fila>
        </div>
      </Bloque>

      <Bloque
        titulo="Input"
        descripcion="Campo de texto con etiqueta, ayuda, error e icono opcional. La etiqueta y el mensaje van unidos al campo para los lectores de pantalla."
      >
        <div className="grid max-w-3xl gap-6 sm:grid-cols-2">
          <Input label="Nombre" placeholder="Escribe tu nombre" />
          <Input
            label="Correo"
            type="email"
            icon={IconMail}
            placeholder="tu@correo.com"
            hint="Lo usamos para avisarte de tus citas."
          />
          <Input
            label="Buscar medicación"
            icon={IconSearch}
            placeholder="Ibuprofeno..."
            size="lg"
          />
          <Input
            label="Teléfono"
            defaultValue="123"
            error="El teléfono debe tener 9 cifras."
          />
          <Input label="Historial" defaultValue="No editable" disabled />
          <Input label="Dosis" size="sm" placeholder="1 comprimido" />
        </div>
      </Bloque>

      <Bloque
        titulo="Badge"
        descripcion="Etiqueta pequeña para marcar un estado. Cinco colores y dos tamaños."
      >
        <div className="space-y-5">
          <Fila etiqueta="variantes">
            <Badge>Sin empezar</Badge>
            <Badge variant="info">Programado</Badge>
            <Badge variant="success" icon={IconCheck}>
              Al día
            </Badge>
            <Badge variant="warning" icon={IconAlertTriangle}>
              Caduca pronto
            </Badge>
            <Badge variant="danger">Fuera de rango</Badge>
          </Fila>
          <Fila etiqueta="tamaños">
            <Badge size="sm" variant="success">
              Pequeña
            </Badge>
            <Badge size="md" variant="success">
              Mediana
            </Badge>
          </Fila>
        </div>
      </Bloque>

      <Bloque
        titulo="Card"
        descripcion="Caja con cabecera opcional (icono, título, frase y acción), cuerpo libre y pie separado."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Card
            icon={IconPill}
            title="Omeprazol 20 mg"
            description="1 comprimido en ayunas"
            action={<Badge variant="success">Al día</Badge>}
            footer={
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Próxima toma: mañana, 8:00
                </span>
                <Button size="sm" variant="ghost">
                  Ver receta
                </Button>
              </div>
            }
          >
            <p className="text-sm text-gray-600">
              Recetado por Dra. Lucía Marín el 4 de marzo. Quedan 12 comprimidos.
            </p>
          </Card>

          <Card
            icon={IconFlask}
            title="Análisis de sangre"
            description="Realizado el 2 de noviembre"
            action={<Badge variant="warning">2 valores a revisar</Badge>}
            footer={
              <Button size="sm" variant="secondary" iconLeft={IconDownload}>
                Descargar PDF
              </Button>
            }
          >
            <p className="text-sm text-gray-600">
              Colesterol y vitamina D fuera del rango de referencia. El resto,
              dentro de lo normal.
            </p>
          </Card>

          <Card
            icon={IconCalendarEvent}
            title="Revisión dental"
            description="Jueves 12, a las 17:30"
            interactive
          >
            <p className="text-sm text-gray-600">
              Clínica Sanz · Calle Mayor 14. Pulsa para ver la cita.
            </p>
          </Card>

          <Card>
            <p className="text-sm text-gray-600">
              Una tarjeta sin cabecera ni pie: solo el contenido que le pases.
            </p>
          </Card>
        </div>
      </Bloque>
    </>
  )
}
