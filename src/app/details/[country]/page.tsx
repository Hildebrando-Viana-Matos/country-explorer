import Image from 'next/image'
import { getCountry } from '@/app/api/get-country'
import Link from 'next/link'
import { getCountryByCode } from '@/app/api/get-country-by-code'
import { BackButton } from '@/components/back-button'
import { CountryProps } from '@/@types/country'

export default async function Country({
  params,
}: {
  params: { country: string }
}) {
  const countryData: CountryProps = await getCountry(params.country)

  const nativeName = countryData.name.nativeName
    ? Object.values(countryData.name.nativeName)
        .map((name) => name.common)
        .join(', ')
    : 'N/A'

  const population = countryData.population?.toLocaleString() || 'N/A'
  const region = countryData.region || 'N/A'
  const subRegion = countryData.subregion || 'N/A'
  const capital = countryData.capital?.[0] || 'No capital'
  const topLevelDomain = countryData.tld?.[0] || 'N/A'

  const currencies = countryData.currencies
    ? Object.values(countryData.currencies)
        .map((currency) => `${currency.name} (${currency.symbol})`)
        .join(', ')
    : 'N/A'

  const languages = countryData.languages
    ? Object.values(countryData.languages).join(', ')
    : 'N/A'

  const borders = countryData.borders || []
  let borderCountries: { name: { common: string } }[] = []

  if (borders.length > 0) {
    const borderCountriesData = await Promise.all(
      borders.map(async (borderCode) => {
        const borderCountry = await getCountryByCode(borderCode)
        return borderCountry?.name?.common || null
      }),
    )
    borderCountries = borderCountriesData.filter(Boolean) as {
      name: { common: string }
    }[]
  }

  return (
    <main className="container mx-auto px-4">
      <BackButton />

      <section className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-20 justify-center items-center">
        <Image
          src={
            countryData.flags?.svg ||
            countryData.flags?.png ||
            '/fallback-image.png'
          }
          alt={countryData.name.common}
          width={500}
          height={500}
          className="mb-6 w-full h-auto"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{countryData.name.common}</h1>

          <div className="flex flex-col sm:flex-row justify-between">
            <div className="mb-4 flex flex-col gap-1">
              <p>
                <b>Native Name:</b> {nativeName}
              </p>
              <p>
                <b>Population:</b> {population}
              </p>
              <p>
                <b>Region:</b> {region}
              </p>
              <p>
                <b>Sub Region:</b> {subRegion}
              </p>
              <p>
                <b>Capital:</b> {capital}
              </p>
            </div>
            <div className="mb-4 flex flex-col gap-1">
              <p>
                <b>Top Level Domain:</b> {topLevelDomain}
              </p>
              <p>
                <b>Currencies:</b> {currencies}
              </p>
              <p>
                <b>Languages:</b> {languages}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-12">
              <b>Border Countries:</b>
              {borderCountries.map((borderCountry) => (
                <Link
                  href={`/details/${borderCountry}`}
                  key={borderCountry.toString()}
                  className="border px-4 py-1 text-sm dark:bg-elements dark:border-transparent dark:shadow-md"
                >
                  {borderCountry.toString()}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
