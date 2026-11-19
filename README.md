# Faro DS

**Faro DS** es el design system de **Faro**, la app de salud personal. Reúne los componentes, tokens y patrones de interfaz con los que se construye todo el producto, para que cada pantalla sea coherente, accesible y rápida de montar.

> **Estado:** 🚧 en arranque. El repositorio está recién creado y todavía no contiene código. Este README describe el alcance y la hoja de ruta.

---

## ¿Qué es Faro?

Faro es una app de salud donde cada persona entra en **su propio portal** y tiene su información médica en un solo sitio:

- 💊 **Recetas y medicación**: qué le han recetado y qué tiene que tomar.
- 🧪 **Análisis y chequeos**: las pruebas que se ha hecho a lo largo del año.
- 📅 **Citas**: las próximas y pasadas, por ejemplo con el dentista.
- 🎙️ **Consultas grabadas y notas**: puede grabar sus consultas y tomar notas sobre ellas.
- 🤖 **Agente de IA**: una conversación para contar cómo se siente.
- 🎯 **Objetivos anuales de revisiones**: vista, dientes, medicina general, etc.
- 📊 **Panel de datos y métricas**: para seguir todo lo anterior de un vistazo.

## ¿Qué es Faro DS?

Faro DS es la **fuente única de verdad del diseño** de Faro: una librería de piezas reutilizables y las reglas para usarlas. Incluye (o incluirá):

- **Design tokens**: color, tipografía, espaciado, radios, sombras y modo claro/oscuro.
- **Componentes de UI**: botones, formularios, tarjetas, listas, navegación, avisos, etc.
- **Componentes de dominio de salud**: tarjeta de medicación, resultado de análisis, cita, nota de consulta, objetivo de revisión.
- **Componentes de datos**: gráficas, indicadores y paneles de métricas.
- **Patrones de conversación**: burbujas, estados de carga y avisos del agente de IA.
- **Guías**: accesibilidad, tono de comunicación y buenas prácticas para contenido sanitario.

## ¿Para quién es?

- **Diseño y producto**: para decidir y documentar cómo se ve y se comporta Faro.
- **Ingeniería**: para construir pantallas con piezas ya probadas en lugar de rehacerlas.
- **Usuarios finales (indirectamente)**: personas que gestionan su salud y necesitan una interfaz clara, calmada y accesible, sobre todo cuando manejan información delicada.

## Principios

1. **Claridad ante todo**: la información de salud debe entenderse a la primera.
2. **Accesibilidad por defecto**: contraste, tamaños táctiles, teclado y lectores de pantalla (objetivo WCAG 2.2 AA).
3. **Confianza y calma**: tono sereno, sin alarmismo.
4. **Consistencia**: lo mismo se ve y se comporta igual en toda la app.
5. **Privacidad en el diseño**: patrones que cuidan los datos sensibles (por ejemplo, ocultar valores en pantalla).

## Qué vamos a construir

| Fase | Contenido |
| --- | --- |
| 1. Fundamentos | Tokens, tipografía, iconografía, rejilla y modo oscuro |
| 2. Componentes base | Controles de formulario, botones, tarjetas, listas, navegación, feedback |
| 3. Componentes de salud | Medicación y recetas, análisis y chequeos, citas |
| 4. Notas y consultas | Grabación de audio, transcripción y editor de notas |
| 5. Agente de IA | Patrones de chat y estados de respuesta |
| 6. Objetivos y métricas | Objetivos anuales de revisiones y paneles con gráficas |
| 7. Documentación | Sitio de documentación, ejemplos y guías de uso |

## Estado actual

- [x] Repositorio creado
- [x] README con la visión del proyecto
- [ ] Elección de stack y herramientas (framework de componentes, documentación, publicación)
- [ ] Tokens base
- [ ] Primeros componentes
- [ ] Sitio de documentación

## Cómo contribuir

El proyecto está en fase inicial. Mientras se define la estructura, las ideas y propuestas se discuten mediante *issues* en este repositorio.

## Licencia

Pendiente de definir.
