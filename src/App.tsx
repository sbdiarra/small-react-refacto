import React from 'react'
import {SelectCountries} from "./selectCountry";

const App = () => {
    return (
        <div>
            <p> React App Without CRA ☘️</p>
            <React.StrictMode>
                <SelectCountries/>
            </React.StrictMode>
        </div>
    )
}

export default App
