import { useState } from 'react'
import {
  IconMoodSmile,
  IconRobot,
  IconSend,
  IconSparkles,
  IconTrash,
} from '@tabler/icons-react'
import { Badge, Button, Card, Input } from '../components'

export const titulo = 'Asistente (antes)'

type Mensaje = {
  id: number
  de: 'persona' | 'asistente'
  texto: string
  hora: string
}

/** Conversación de ejemplo, para poder ver el historial nada más entrar. */
const CONVERSACION: Mensaje[] = [
  {
    id: 1,
    de: 'persona',
    texto: 'Llevo unos días durmiendo fatal y me levanto con dolor de cabeza.',
    hora: '09:12',
  },
  {
    id: 2,
    de: 'asistente',
    texto:
      'Siento oírlo. ¿Dirías que el dolor aparece nada más despertar o va a más durante la mañana?',
    hora: '09:12',
  },
  {
    id: 3,
    de: 'persona',
    texto: 'Nada más despertar. Luego se me pasa cuando desayuno.',
    hora: '09:14',
  },
  {
    id: 4,
    de: 'asistente',
    texto:
      'Lo anoto. Veo que tienes una revisión de medicina general pendiente este año: puede ser buen momento para comentarlo. ¿Quieres que te lo recuerde cuando pidas la cita?',
    hora: '09:14',
  },
]

const SUGERENCIAS = [
  'Hoy me noto con poca energía',
  'Quiero repasar mi medicación',
  'Me cuesta dormir',
]

/** Respuesta de relleno: no hay ninguna IA detrás de esta pantalla. */
const RESPUESTA =
  'Gracias por contármelo. Lo guardo en tus notas para que puedas repasarlo en tu próxima consulta.'

function horaAhora() {
  return new Date().toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Burbuja({ mensaje }: { mensaje: Mensaje }) {
  const esPersona = mensaje.de === 'persona'

  return (
    <div className={esPersona ? 'flex justify-end' : 'flex justify-start'}>
      <div className="max-w-lg">
        {esPersona ? (
          <div className="rounded-xl bg-teal-600 px-4 py-3 text-sm text-white">
            {mensaje.texto}
          </div>
        ) : (
          <Card>
            <p className="text-sm text-gray-700">{mensaje.texto}</p>
          </Card>
        )}
        <p
          className={
            esPersona
              ? 'mt-1 text-right text-xs text-gray-400'
              : 'mt-1 text-xs text-gray-400'
          }
        >
          {mensaje.hora}
        </p>
      </div>
    </div>
  )
}

function EstadoVacio({ onElegir }: { onElegir: (texto: string) => void }) {
  return (
    <div className="flex min-h-96 items-center justify-center">
      <div className="max-w-md">
        <Card
          icon={IconRobot}
          title="¿Cómo te sientes hoy?"
          description="Cuéntame cómo estás y lo guardo en tus notas."
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Puedes hablarme de cómo duermes, de tu ánimo o de cualquier
              molestia. Nada de lo que escribas sustituye a una consulta
              médica.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGERENCIAS.map((sugerencia) => (
                <Button
                  key={sugerencia}
                  size="sm"
                  variant="secondary"
                  iconLeft={IconSparkles}
                  onClick={() => onElegir(sugerencia)}
                >
                  {sugerencia}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default function Asistente() {
  const [mensajes, setMensajes] = useState<Mensaje[]>(CONVERSACION)
  const [texto, setTexto] = useState('')

  const vacio = mensajes.length === 0

  function enviar() {
    const limpio = texto.trim()
    if (limpio === '') return

    const hora = horaAhora()
    setMensajes((previos) => [
      ...previos,
      { id: Date.now(), de: 'persona', texto: limpio, hora },
      { id: Date.now() + 1, de: 'asistente', texto: RESPUESTA, hora },
    ])
    setTexto('')
  }

  return (
    <div className="flex flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Asistente</h1>
          <Badge variant="success" icon={IconMoodSmile}>
            Disponible
          </Badge>
        </div>
        {!vacio && (
          <Button
            variant="ghost"
            size="sm"
            iconLeft={IconTrash}
            onClick={() => setMensajes([])}
          >
            Vaciar conversación
          </Button>
        )}
      </header>

      {vacio ? (
        <EstadoVacio onElegir={setTexto} />
      ) : (
        <div className="min-h-96 space-y-4 pb-6">
          {mensajes.map((mensaje) => (
            <Burbuja key={mensaje.id} mensaje={mensaje} />
          ))}
        </div>
      )}

      <form
        className="sticky bottom-0 flex items-end gap-2 border-t border-gray-200 bg-white py-4"
        onSubmit={(evento) => {
          evento.preventDefault()
          enviar()
        }}
      >
        <Input
          aria-label="Escribe tu mensaje"
          placeholder="Cuéntame cómo te sientes..."
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <Button
          type="submit"
          iconLeft={IconSend}
          aria-label="Enviar mensaje"
          disabled={texto.trim() === ''}
        />
      </form>
    </div>
  )
}
