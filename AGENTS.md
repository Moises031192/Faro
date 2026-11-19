# AGENTS.md

Manual para agentes de IA que trabajan en este repositorio. Léelo antes de cada tarea.

## Qué es

Este repositorio es **Faro DS**, el design system de Faro: la librería de componentes, tokens y patrones con la que se construye **Faro**, la app de salud. En Faro cada persona entra en su portal y ve sus recetas y medicación, sus análisis y chequeos, y sus citas; puede grabar consultas y tomar notas, hablar con un agente de IA sobre cómo se siente y fijarse objetivos anuales de revisiones, con un panel de datos y métricas.

Todo lo que se haga aquí debe servir a esa app: interfaces claras, accesibles y calmadas para información sensible.

## Tecnología

- **React con TypeScript** y **Vite** como base del proyecto.
- **Tailwind** para los estilos.
- **Tabler Icons** para los iconos.
- **Ninguna librería de componentes**: los componentes se crean desde cero. No añadas dependencias como MUI, Chakra, Radix, shadcn, etc.

## Cómo trabajamos

- **Idioma**: todo en español (conversación, commits, PRs, documentación).
- **Ramas y PR**: a partir de ahora, siempre en una rama propia y con una PR. No se sube directamente a `main`, salvo que el usuario lo pida de forma expresa para una tarea concreta.
- **Explicaciones sin jerga**: explica los cambios en lenguaje sencillo, pensando en alguien que no es técnico. Si usas un término técnico, aclara qué significa.
- **Dependencias**: si cambias `package.json`, actualiza `package-lock.json` en la misma PR.
