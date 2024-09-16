import axios from 'axios'

export async function getCountryByCode(code: string) {
  try {
    const url = `https://restcountries.com/v3.1/alpha/${code}`
    const { data } = await axios.get(url)
    return data[0]
  } catch (error) {
    console.error('Error fetching country by code:', error)
    return null
  }
}
