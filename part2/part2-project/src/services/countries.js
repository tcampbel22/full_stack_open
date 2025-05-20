import axios from "axios";
const COUNTRY_URL = 'https://studies.cs.helsinki.fi/restcountries/'


const getAllCountries = () => {
	 const request = axios.get(`${COUNTRY_URL}api/all`);
	 return request.then(response => response.data);
}

const getCountry = country => {
	const request = axios.get(`${COUNTRY_URL}api/name/${country}`);
	return request.then(response => response.data);
}

export default { getAllCountries, getCountry }

