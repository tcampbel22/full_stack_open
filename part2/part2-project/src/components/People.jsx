const Person = ({person, removePerson}) => { 
	return (
		<p> 
			{person.name} {person.number} 
			<button onClick={() => removePerson(person.id)}>Delete</button>
			{/* <li>Debug: {person.id}</li> */}
		</p>
	)
}

const People = ({persons, newFilter, removePerson}) => {
	return (
		<div>
		{/* <div>Debug: {newFilter}</div> */}
		{persons.map(person => 
			person.name.toLowerCase().includes(newFilter.toLowerCase()) && 
			<Person key={person.name} person={person} removePerson={removePerson}/>
	)}
	</div>
	)
};

export default People