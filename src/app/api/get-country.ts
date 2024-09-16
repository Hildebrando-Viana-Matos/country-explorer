import axios from 'axios'

export async function getCountry(countryNameOrCode: string) {
  try {
    const url = `https://restcountries.com/v3.1/name/${countryNameOrCode}?fullText=true`
    const response = await axios.get(url)

    if (response.status === 200 && response.data.length > 0) {
      return response.data[0]
    }
  } catch (error) {
    console.error('Error fetching country:', error)
  }

  return null
}
