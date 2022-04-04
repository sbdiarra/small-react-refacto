import {useState} from 'react'

export interface Country {
    code: string
    name: string
}

export const fetchEuCountriesCode = (): Promise<string[]> => Promise.resolve(['FR', 'DE', 'UA',])

export const fetchCountries = (): Promise<Country[]> => Promise.resolve([
    {code: 'FR', name: 'France'},
    {code: 'DE', name: 'Allemagne'},
    {code: 'UA', name: 'Ukraine'},
    {code: 'RU', name: 'Russie'},
    // ...
])

export const SelectCountries = () => {
    const [selectedCodes, setSelectedCodes] = useState<Country[]>([])
    const [countries, setCountries] = useState<Country[] | undefined>()
    const [euCountriesCode, setEuCountriesCode] = useState<string[] | undefined>()

    fetchCountries()
        .then(setCountries)
        .then(fetchEuCountriesCode)
        .then(setEuCountriesCode)

    const handleChange = (country: Country) => {
        setSelectedCodes(prev => {
            if (prev.find(_ => _.code === country.code)) return prev.filter(_ => _.code !== country.code)
            return [...prev, country]
        })
    }

    return (
        <>
            Sélectionnés: {selectedCodes.map(_ => _.name).join(', ')}

            {countries?.filter(_ => euCountriesCode?.includes(_.code)).map(country =>
                <div key={country.code}>
                    <input type="checkbox" checked={!!selectedCodes.find(_ => _.code === country.code)} onChange={() => handleChange(country)}/>
                    {country.name}
                </div>
            )}
        </>
    )
}
