import { useState } from 'react'

const Person = ({person}) => { return <p> {person.name} </p> }

const People = ({persons}) => {
	return (
	<div>
		{/* <div>Debug: {persons[0].name }</div> */}
		{persons.map(person => 
			<Person key={person.name} person={person}/>
		)}
	</div>
	)
};

const App = () => {
  const [persons, setPersons] = useState([{}]) //Array of people objects 
  const [newName, setNewName] = useState('enter name...')

 const addPerson = (event) => {
	event.preventDefault();
	console.log("Clicked add", event.target);
	const dup = persons.find(person => person.name === newName)
	if (dup) {
		alert(`'${newName}' already exists in the phonebook`)
		return
	} 
	const nameObject = { name: newName }
	console.log("new name: ", nameObject.name);
	setPersons(persons.concat(nameObject));
	setNewName('')
 } 
 
  const handleNewNames = (event) => {
	event.preventDefault();
	console.log(event.target.value);
	setNewName(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
			<label htmlFor='name'>name:</label>
          <input id='name' name='full-name' value={newName} onChange={handleNewNames} type='text'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
		{/* <div>debug: {newName}</div> */}
      <h2>Numbers</h2>
		<People persons={persons}/>
    </div>
  )
}

export default App