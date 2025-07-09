const PersonForm = ({addPerson, handleNewNames, handleNewNumbers, newName, newNumber}) => {
	return (
		<form onSubmit={addPerson}>
        <div>
          <input 
			id='name' 
			name='full-name' 
			value={newName} 
			onChange={handleNewNames} 
			type='text' 
			placeholder='enter name...'/>
        </div>
		<div>
          <input 
			id='number' 
			name='phone-number' 
			value={newNumber} 
			onChange={handleNewNumbers} 
			type='text' 
			placeholder='enter number...'/>
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
	)
}

export default PersonForm