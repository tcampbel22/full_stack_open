import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountriesFilter from './components/CountriesFilter'
import Countries from './components/Countries'
import { Header1 } from './components/Header'


const CountryApp = () => {
	const [countries, setCountries] = useState([]);
	const [countryFilter, setCountryFilter] = useState('');
	const [showCountry, setShowCountry] = useState(null);
	const [weather, setWeather] = useState({})
	
	useEffect(() => {
		countryService.getAllCountries().then(returnedCountries => {
			console.log("Promise fufilled")
			setCountries(returnedCountries);
		})
	}, []);

	useEffect(() => {
		const filtered = countries.filter(c => {
			return c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
		});
		if (filtered.length === 1) {
			setShowCountry(filtered[0]);
			handleWeather(filtered[0].capital[0])
		}
	}, [countryFilter, countries])

	const handleWeather = (capital) => {
		countryService.getWeather(capital).then(returnedWeather => {
			setWeather(returnedWeather);
		})
		.catch(error => {
			console.error(`Could not fetch weather from ${capital}`, error);
		})
	}

	const handleCountryInfo = (country) => {
		countryService.getCountry(country.name.common).then(returnedCountry => {
			setShowCountry(returnedCountry)
			handleWeather(country.capital[0]);
		})
		.catch(error => {
			console.error(`Could not fetch ${country.name.common}`, error);
		})
		console.log(`Clicked Show Button`);
	}

	const handleCountryFilter = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setCountryFilter(event.target.value);
		setShowCountry(null);
		setWeather({})
	};

	return (
		<div>
			<Header1 header={"Countries App"}/>
			<CountriesFilter 
				countryFilter={countryFilter} 
				handleCountryFilter={handleCountryFilter}
			/>
			<Countries
				countries={countries}
				countryFilter={countryFilter}
				handleCountryInfo={handleCountryInfo}
				showCountry={showCountry}
				weather={weather}
			/>
		</div>
	)
}

export default CountryApp