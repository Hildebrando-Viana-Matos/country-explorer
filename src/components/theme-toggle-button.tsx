'use client'

import { useState, useEffect } from 'react'
import { IoMoonOutline, IoMoonSharp } from 'react-icons/io5'
import { useTheme } from 'next-themes'

export function ThemeToggleButton() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function toggleTheme() {
    if (resolvedTheme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="bg-elements flex items-center gap-2 font-semibold py-2 px-3 rounded transition-all hover:brightness-95"
    >
      {resolvedTheme === 'dark' ? (
        <>
          <IoMoonSharp />
          Dark Mode
        </>
      ) : (
        <>
          <IoMoonOutline />
          Light Mode
        </>
      )}
    </button>
  )
}
