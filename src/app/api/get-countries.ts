import axios from 'axios'

interface QueryParams {
  country?: string
  region?: string
}

export async function getCountries({ country, region }: QueryParams) {
  try {
    let url = ''

    if (country && region) {
      url = `https://restcountries.com/v3.1/name/${country}`
      const { data } = await axios.get(url)
      return data.filter((c: { region: string }) => c.region === region)
    }

    if (country) {
      url = `https://restcountries.com/v3.1/name/${country}`
    }

    if (region) {
      url = `https://restcountries.com/v3.1/region/${region}`
    }

    if (!country && !region) {
      url = 'https://restcountries.com/v3.1/all'
    }

    const { data } = await axios.get(url)
    return data
  } catch (error) {
    console.error('Error fetching countries:', error)
    return []
  }
}
