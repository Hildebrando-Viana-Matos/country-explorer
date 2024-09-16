export interface CountryProps {
  name: {
    common: string
    nativeName?: {
      [key: string]: {
        common: string
      }
    }
  }
  population: number
  region: string
  subregion?: string
  fifa: string
  capital?: string[]
  tld?: string[]
  currencies?: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages?: {
    [key: string]: string
  }
  borders?: string[]
  flags: {
    png?: string
    svg?: string
  }
}
