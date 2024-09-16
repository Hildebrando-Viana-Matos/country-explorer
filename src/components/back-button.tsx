'use client'

import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'

export function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-8 py-2 border shadow-md rounded bg-elements max-w-32 my-12 dark:border-transparent"
    >
      <FiArrowLeft size={16} />
      <span>Back</span>
    </button>
  )
}
