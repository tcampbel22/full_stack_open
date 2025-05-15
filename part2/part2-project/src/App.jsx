import { useState } from 'react'

const Header = ({header}) => { return <h2>{header}</h2> }

const Person = ({person}) => { 
	return (
		<p> {person.name} {person.number} </p>
	)
}

const People = ({persons, newFilter}) => {
	return (
		<div>
		{/* <div>Debug: {newFilter}</div> */}
		{persons.map(person => 
			person.name.toLowerCase().includes(newFilter.toLowerCase()) && 
			<Person key={person.name} person={person}/>
	)}
	</div>
	)
};

const FilterInput = ({handleFilter, newFilter}) => {
	return (
		<div>
			<label htmlFor='filter'>Filter names by</label>
			<input
				id='filter'
				name='filter-type'
				value={newFilter}
				onChange={handleFilter}
				type='text'
				placeholder='enter filter parameters...'
			/>
		</div>
	)
}

const PersonForm = ({addPerson, handleNewNames, handleNewNumbers, newName, newNumber}) => {
	return (
		<form onSubmit={addPerson}>
        <div>
			<label htmlFor='name'>name:</label>
          <input 
			id='name' 
			name='full-name' 
			value={newName} 
			onChange={handleNewNames} 
			type='text' 
			placeholder='enter name...'/>
        </div>
		<div>
			<label htmlFor='number'>number:</label>
          <input 
			id='number' 
			name='phone-number' 
			value={newNumber} 
			onChange={handleNewNumbers} 
			type='text' 
			placeholder='enter number...'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	)
}


const App = () => {
  const [persons, setPersons] = useState([]) //Array of people objects 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
	event.preventDefault();
	console.log("Clicked add", event.target);
	if (!newName)
		return alert("Please enter a name")
	if (!newNumber)
		return alert("Please enter a number")
	if (persons.find(person => person.name === newName))
		return alert(`'${newName}' already exists in the phonebook`)
	const nameObject = { 
		name: newName,
		number: newNumber,
		id: persons.length + 1
	}
	console.log("new name: ", nameObject.name, "\nid: ", nameObject.id, "\nnumber: ", nameObject.number);
	setPersons(persons.concat(nameObject));
	setNewName('')
	setNewNumber('')
 } 
 
  const handleNewNames = (event) => {
	event.preventDefault();
	console.log(event.target.value);
	setNewName(event.target.value);
  }

  const handleNewNumbers = (event) => {
	event.preventDefault();
	console.log(event.target.value);
	setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
	event.preventDefault();
	console.log(event.target.value);
	setNewFilter(event.target.value);
  }
  return (
    <div>
	<Header header="Phonebook"/>
	<FilterInput 
		handleFilter={handleFilter}
		newFilter={newFilter}
	/>
	<Header header="add a new"/>
	<PersonForm  
		addPerson={addPerson}
		handleNewNames={handleNewNames}
		handleNewNumbers={handleNewNumbers}
		newName={newName}
		newNumber={newNumber}
	/>
	<Header header="Numbers"/>
	<People 
		persons={persons}
		newFilter={newFilter}
	/>
    </div>
  )
}

export default App