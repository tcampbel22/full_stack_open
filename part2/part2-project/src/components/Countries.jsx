import { Header2 } from './Header'


const Weather = ({ weather }) => {
	if (!weather || !weather.current)
		return;
	const wind = (weather.current.wind_kph * 1000) / 3600
	return (
		<div>
			<p>Temp: {weather.current.temp_c} celcius</p>
			<img src={weather.current.condition.icon} alt={weather.current.condition.text}/>
			<p>Wind Speed: {wind.toPrecision(2)} m/s</p>
		</div>
	)
}


const Country = ({country, handleCountryInfo}) => {
	return (
		<div>
			<li>
				{country.name.common} <button onClick={() => handleCountryInfo(country)}>Show</button>
			</li> 
		</div>
		)
}

const Languages = ({ languages }) => {
	return (
		<ul>
			{Object.values(languages).map((value, index) => {
				return <li key={index}>{value}</li>
			})}
		</ul>
	)
}

const Flag = ({ flags }) => {
	return (
		<div>
			<img src={flags.png} alt={flags.alt}/>
		</div>
	)
}

const CountryInfo = ({ country, weather }) => {
	return (
		<div>
			<Header2 header={country.name.common}/>
			<li>Capital {country.capital}</li>
			<li>Area {country.area}</li>
			<Header2 header={'Languages'}/>
			<Languages languages={country.languages}/>
			<Flag flags={country.flags}/>
			<Header2 header={`Weather in ${country.capital}`}/>
			<Weather weather={weather}/>
		</div>
	)
}

const Countries = ({ countries, countryFilter, handleCountryInfo, showCountry, weather }) => {
	if (!countryFilter)
		return <p>List is empty</p>

	const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()));

	if (filteredCountries.length === 0) // No country names match the input
		return <p>No match found</p>

	else if (showCountry) // The show button has been clicked
		return <CountryInfo country={showCountry} weather={weather}/>

	else if (filteredCountries.length === 1) // The input matches only one country
		return <CountryInfo country={filteredCountries[0]} weather={weather}/>
		
	else if (filteredCountries.length > 10) // The input matches over 10 countries
		return <p>Too many matches, specify another filter</p>
	// The input matched between 2 and 10 countries
	return (
			<ul>
				{filteredCountries.map((country, index) => {
					return (  
					<Country 
						key={index} 
						country={country} 
						handleCountryInfo={handleCountryInfo}
					/>)
				})}	
			</ul>
	)
}

export default Countries

