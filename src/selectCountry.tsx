import React, {useEffect, useState} from 'react'

export interface Country {
    code: string
    name: string


}

// structure spécifique pour les pays cochés
export type CheckedCountries = {
    [code in string]: {
        isChecked: boolean,
        name: string
    }
}


export const fetchEuCountriesCode = (): Promise<string[]> => Promise.resolve(['FR', 'DE', 'UA'])

export const fetchCountries = (): Promise<Country[]> =>
    Promise.resolve([
        {code: 'FR', name: 'France'},
        {code: 'DE', name: 'Allemagne'},
        {code: 'UA', name: 'Ukraine'},
        {code: 'RU', name: 'Russie'},
        // ...
    ])

export const SelectCountries = () => {
    const [selectedCodes, setSelectedCodes] = useState<CheckedCountries>({})
    const [countries, setCountries] = useState<Country[]>([])

    // nouveau state pour stocker dès le départ les pays autorisés, on s'affranchi d'un filter inutile (voir plus bas)
    // à chaque rechargement
    const [allowedCountries, setAllowedCountries] = useState<Country[]>([])
    const [euCountriesCode, setEuCountriesCode] = useState<string[]>([])


    useEffect(() => {
        // on utilise ici promise.all pour récupérer les pays et les codes pays
        Promise.all([fetchCountries(), fetchEuCountriesCode()]).then(([ctry, ctryCode]) => {

            // on instancie dès le départ la liste des pays déjà autoriséb
            const okCtry = ctry?.filter((_) => ctryCode?.includes(_.code))

            // on initialise la structure qui va contenir la logique du check des pays, à partir des pays autorisés
            const initSelectedCodes: CheckedCountries = okCtry.reduce((prev: CheckedCountries, curr: Country) => {
                return {
                    ...prev,
                    [curr.code]: {isChecked: false, name: curr.name}
                } as CheckedCountries

            }, {} as CheckedCountries)
            setSelectedCodes(initSelectedCodes)
            setCountries(ctry)
            setEuCountriesCode(ctryCode)
            setAllowedCountries(okCtry)
        })

    }, [])

    const handleChange = (country: Country, isChecked: boolean) => {
        //plus besoin de faire un find suivi de filter pour gérer l'état des checkbox
        setSelectedCodes((prev: CheckedCountries) => ({
            ...prev,
            [country.code]: {
                isChecked,
                name: country.name
            }
        }))
    }

    return (
        <>
            Sélectionnés: {Object.values(selectedCodes).filter(({isChecked}) => isChecked).map(_ => _.name).join(", ")}
            {
                allowedCountries
                    .map((country) => (
                        <div key={country.code}>
                            <input type="checkbox" checked={selectedCodes[country.code].isChecked} onChange={(e) => handleChange(country, e.currentTarget.checked)}/>
                            {country.name}
                        </div>
                    ))}

        </>
    )
}
