import { useState, useEffect } from 'react'
import PersonForm  from './components/PersonForm'
import FilterInput  from './components/Filter'
import People from './components/People'
import personService from './services/persons'
import Footer from './components/Footer'
import Added from './components/Added'
import Error from './components/Error'
import { Header1, Header2 } from './components/Header'
 

const App = () => {
	const [persons, setPersons] = useState([]) //Array of people objects 
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');
	const [isAdded, setIsAdded] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	
	useEffect(() => {
		personService.getPersons().then(returnedPersons => {
				console.log('Promise fufilled', returnedPersons)
				setPersons(returnedPersons);
			})
		}, [])
	
	const toggleAdded = ( msg )=> {
		setIsAdded(msg);
		setTimeout(() => { setIsAdded(null) }, 3000);
	}
	
	const addPerson = (event) => {
		event.preventDefault();
		if (!newName)
			return alert("Please enter a name")
		if (!newNumber)
			return alert("Please enter a number")
		const person = persons.find(person => person.name === newName)
		if (person) {
			setNewName('')
			setNewNumber('')
			return handleUpdateNumber(person);
		}
		
		const nameObject = { 
			name: newName,
			number: newNumber,
		}
		personService.createPerson(nameObject).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson));
			setNewName('')
			setNewNumber('')
			console.log("name: ", returnedPerson.name, "\nid: ", returnedPerson.id, "\nnumber: ", returnedPerson.number);
			toggleAdded(`Added ${returnedPerson.name}`);
		})
		.catch(error => {
			console.error(`Failed to create ${newName}`, error);
			setErrorMessage(`Failed to create ${newName}`);
			setTimeout(() => {setErrorMessage(null)}, 2000);

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
				toggleAdded(`Updated ${person.name}`);
			})
			.catch(error => {
				console.error(`Failed to update ${person.name}'s number. Status: ${error.response.status}`, error);
				if (error.response.status === 404) {
					setErrorMessage(`Cannot update ${person.name} as they have been deleted or do not exist`)
				} else {
					setErrorMessage(`Cannot update ${person.name}, please try again`)
				}
				setTimeout(() => {setErrorMessage(null)}, 2000);
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
			if (error.response.status === 404) {
				setErrorMessage(`Cannot delete ${person.name} as they have been deleted aready or do not exist`)
			} else {
				setErrorMessage(`Cannot delete ${person.name}, please try again`)
			}
			setTimeout(() => {setErrorMessage(null)}, 2000);
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
		<Header1 header="Phonebook"/>
		<Added msg={isAdded}/>
		<Error msg={errorMessage}/>
		<FilterInput
			handleFilter={handleFilter}
			newFilter={newFilter}
		/>
		<Header2 header="Add new contact"/>
		<PersonForm  
			addPerson={addPerson}
			handleNewNames={handleNewNames}
			handleNewNumbers={handleNewNumbers}
			newName={newName}
			newNumber={newNumber}
		/>
		<Header2 header="Numbers"/>
		<People 
			persons={persons}
			newFilter={newFilter}
			removePerson={removePerson}
		/>
		<Footer />
	</div>
	)
}

export default App