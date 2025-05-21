
const CountriesFilter = ({handleCountryFilter, countryFilter}) => {
	return (
		<div>
			<label htmlFor="name">Country Search:</label>
				<input
					value={countryFilter}
					onChange={handleCountryFilter}
					type="text"
					placeholder="enter country name...">
				</input>
	</div>
	)
}

export default CountriesFilter