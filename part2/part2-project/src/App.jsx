import { useState, useEffect } from 'react'
import PersonForm  from './components/PersonForm'
import FilterInput  from './components/Filter'
import People from './components/People'
import personService from './services/persons'


const Header = ({header}) => { return <h2>{header}</h2> }

const App = () => {
	const [persons, setPersons] = useState([]) //Array of people objects 
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [newFilter, setNewFilter] = useState('')
	
	useEffect(() => {
		personService.getPersons().then(returnedPersons => {
				console.log('Promise fufilled', returnedPersons)
				setPersons(returnedPersons);
			})
		}, [])

	const addPerson = (event) => {
		event.preventDefault();
		if (!newName)
			return alert("Please enter a name")
		if (!newNumber)
			return alert("Please enter a number")
		const person = persons.find(person => person.name === newName)
		if (person)
			return handleUpdateNumber(person);
		
		const nameObject = { 
			name: newName,
			number: newNumber,
		}
	personService.createPerson(nameObject).then(returnedPerson => {
		setPersons(persons.concat(returnedPerson));
		setNewName('')
		setNewNumber('')
		console.log("new name: ", returnedPerson.name, "\nid: ", returnedPerson.id, "\nnumber: ", returnedPerson.number);
		})
		.catch(error => {
			console.error(`Failed to create ${newName}'s number`, error);
		});
	}

	const handleUpdateNumber = (person) => {
		if (newNumber === person.number)
			return alert("Number is the same, add a different one")
		const confirm = window.confirm(`${newName} already exists in the phonebook, do you want to replace the number?`)
		if (confirm) {
			const numObject = { 
				...person, 
				number: newNumber
			}
			personService.updateNumber(person.id, numObject)
			.then(updatedPerson => {
				setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson) );
			})
			.catch(error => {
				console.error(`Failed to update ${person.name}'s number`, error);
			});
		}
		else {
			console.log("Clicked cancel")
			return;
		}

	}

	const removePerson = (id) => {
		const person = persons.find(person => person.id === id)
		if (!person) 
			return;
		const confirm = window.confirm('Are you sure you want to delete this person?');
		if (!confirm) 
			return;
		personService
		.removePerson(id)
		.then(() => { 
			setPersons(persons.filter(p => id !== p.id));
			})
		.catch(error => {
			console.error(`Failed to delete person ${id}`, error);
		})
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
			removePerson={removePerson}
		/>
	</div>
	)
}

export default App