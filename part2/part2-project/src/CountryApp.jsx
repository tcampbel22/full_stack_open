import { useState, useEffect } from 'react'
import countryService from './services/countries'
import PersonForm from './components/PersonForm'
import CountriesForm from './components/CountriesForm'

const Header1 = ({header}) => { return <h1>{header}</h1> }
const Header2 = ({header}) => { return <h2>{header}</h2> }

const Country = ({country}) => {
	return (
		<li>{country}</li>
	)
}

const CountryInfo = ({country}) => {
	return (
		<div>
			<Header1 header={country.common.name}/>
			<li>Capital {country.capital}</li>
			<li>Area {country.area}</li>
		</div>
	)
}

const Countries = ({countries, countryFilter}) => {
	if (!countryFilter)
		return
	if (countries.filter((country) => country.toLowerCase().includes(countryFilter.toLowerCase())).length > 10) {
		return <p>Too many matches, specify another filter</p>
	}
	if (!countries.map((country) => country.toLowerCase().includes(countryFilter.toLowerCase()))) {
		return <p>No match found</p>
	}
	return (
		<div>
			<ul>
				{countries.map((country, index) => {
					return country.toLowerCase().includes(countryFilter.toLowerCase()) && 
					<Country key={index} country={country}/>
				})}	
			</ul>
		</div>
	)
}

const CountryApp = () => {
	const [countries, setCountries] = useState([]);
	const [countryFilter, setCountryFilter] = useState('');
	const [searched, setSearched] = useState([]);
	
	useEffect(() => {
		countryService.getAllCountries().then(returnedCountries => {
			console.log("Promise fufilled")
			setCountries(returnedCountries);
			setSearched(returnedCountries.map(country => country.name.common));
		})
	}, []);

	const handleCountryFilter = (event) => {
		event.preventDefault();
		console.log(event.target.value);
		setCountryFilter(event.target.value);
	};
	
	return (
		<div>
			<Header1 header={"Countries App"}/>
			<CountriesForm 
				countryFilter={countryFilter} 
				handleCountryFilter={handleCountryFilter}
			/>
			<Header2 header={'List of countries'}/>
			<Countries 
				countries={searched}
				countryFilter={countryFilter}
			/>

		</div>
	)
}

export default CountryApp