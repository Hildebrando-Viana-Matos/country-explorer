'use client'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FiChevronDown, FiSearch } from 'react-icons/fi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

const searchSchema = z.object({
  country: z.string().optional(),
  region: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

export function InputSearch() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const searchTerm = {
    country: searchParams.get('country') || '',
    region: searchParams.get('region') || '',
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: searchTerm,
  })

  const countryWatch = watch('country')
  const regionWatch = watch('region')

  const handleSearchCountryAndRegion = useDebouncedCallback(
    (data: SearchFormData) => {
      const params = new URLSearchParams(searchParams)

      if (data.country) {
        params.set('country', data.country)
      } else {
        params.delete('country')
      }

      if (data.region) {
        params.set('region', data.region)
      } else {
        params.delete('region')
      }

      replace(`${pathname}?${params.toString()}`)
    },
    500,
  )

  useEffect(() => {
    handleSearchCountryAndRegion({ country: countryWatch, region: regionWatch })

    return () => {
      handleSearchCountryAndRegion.cancel()
    }
  }, [countryWatch, regionWatch, handleSearchCountryAndRegion])

  const [isOpen, setIsOpen] = useState(false)

  const regions = [
    { value: '', label: 'All' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Americas', label: 'Americas' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' },
  ]

  const handleSelect = (optionValue: string) => {
    setValue('region', optionValue)
    setIsOpen(false)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchCountryAndRegion)}
      className="flex items-center justify-between flex-col gap-4 sm:flex-row"
    >
      <div className="relative w-full lg:max-w-md">
        <input
          type="search"
          id="search-country"
          className={`block w-full p-4 pl-10 text-sm rounded-md bg-elements shadow-md focus:ring ${
            errors.country ? 'ring-red-500' : 'ring-blue-200'
          }`}
          placeholder="Search for a country"
          {...register('country')}
        />
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <FiSearch size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="relative w-full sm:w-auto">
        <div
          className="w-full sm:min-w-[200px] p-4 rounded-md bg-elements shadow-md dark:text-white dark:border-transparent cursor-pointer flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {regionWatch
            ? regions.find((r) => r.value === regionWatch)?.label
            : 'Filter by Region'}
          <FiChevronDown size={20} />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-elements dark:bg-dark-elements shadow-lg rounded-md">
            {regions.map((region) => (
              <div
                key={region.value}
                onClick={() => handleSelect(region.value)}
                className={`p-2 px-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md ${
                  regionWatch === region.value
                    ? 'bg-blue-100 dark:bg-gray-700'
                    : ''
                }`}
              >
                {region.label}
              </div>
            ))}
          </div>
        )}

        <input type="hidden" value={regionWatch} {...register('region')} />
      </div>
    </form>
  )
}
