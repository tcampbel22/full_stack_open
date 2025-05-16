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

export default PersonForm