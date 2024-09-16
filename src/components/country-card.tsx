import Image from 'next/image'
import Link from 'next/link'

interface CountryCardsProps {
  country: {
    name: string
    population: number
    region: string
    capital: string
    flag: string
  }
}

export function CountryCards({ country }: CountryCardsProps) {
  return (
    <div className="rounded-md bg-elements shadow-md">
      <Image
        src={country.flag}
        width={320}
        height={320}
        alt="Flag"
        className="w-full aspect-video object-cover rounded-t-md"
      />

      <div className="px-4 py-6">
        <Link
          href={`/details/${country.name}`}
          className="block text-lg font-bold mb-2 hover:underline"
        >
          {country.name}
        </Link>
        <div>
          <p className="text-sm font-semibold">
            <b>Population</b>: {country.population.toLocaleString('en-US')}
          </p>
          <p className="text-sm font-semibold">
            <b>Region</b>: {country.region}
          </p>
          <p className="text-sm font-semibold">
            <b>Capital</b>: {country.capital}
          </p>
        </div>
      </div>
    </div>
  )
}
