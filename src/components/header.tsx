import { ThemeToggleButton } from './theme-toggle-button'

export function Header() {
  return (
    <header className="bg-elements border-b-2 dark:border-transparent">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="font-bold text-sm sm:text-xl">Where in the world?</h1>
        <ThemeToggleButton />
      </div>
    </header>
  )
}
