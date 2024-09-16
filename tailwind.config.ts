import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--color-background)',
        'elements': 'var(--color-elements)',
        'input': 'var(--color-input)',
        'text': 'var(--color-text)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

export default config
