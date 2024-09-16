import { CountryCards } from '@/components/country-card'
import { getCountries } from './api/get-countries'
import { InputSearch } from '@/components/input-search'
import { CountryProps } from '@/@types/country'

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    country?: string
    region?: string
    page?: string
  }
}) {
  const query = {
    country: searchParams?.country || '',
    region: searchParams?.region || '',
  }

  const countries = await getCountries(query)

  return (
    <main className="container mx-auto px-4">
      <section className="my-8">
        <InputSearch />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
        {countries && countries.length > 0 ? (
          countries.map((country: CountryProps) => (
            <CountryCards
              key={country.name.common}
              country={{
                name: country.name.common,
                population: country.population,
                region: country.region,
                capital: country.capital?.[0] || 'No capital',
                flag: country.flags?.svg || country?.flags?.png || 'N/A',
              }}
            />
          ))
        ) : (
          <p>No countries found</p>
        )}
      </section>
    </main>
  )
}
