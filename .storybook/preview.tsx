import type { Preview } from '@storybook/react-vite'

// Carga Tailwind para que los componentes se vean igual que en la app.
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Deja la página de estado arriba del todo, y luego los componentes.
      storySort: {
        order: ['Estado', 'Componentes'],
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
