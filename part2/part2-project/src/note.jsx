import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from "./services/notes"


const Note = ({ note, toggleImportance }) => { 
	const label = note.important ? 'make not important' : 'make important'
	return (
		<li>
			{note.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>  
	)
}

const App = () => {
		const [notes, setNotes] = useState([])
		const [newNote, setNewNote] = useState('')
		const [showAll, setShowAll] = useState(true);
	
		const handleNewNote = (event) => {
				event.preventDefault();
				console.log(event.target.value);
				setNewNote(event.target.value);
			}
		
			useEffect(() => {
					noteService.getAll().then(intitalNotes => setNotes(intitalNotes))
				  }, [])
			
				const addNote = (event) => {
						event.preventDefault();
						const noteObject = {
								content: newNote,
								important: Math.random() < 0.5,
							}
							noteService.create(noteObject).then(returnedNote => {
									setNotes(notes.concat(returnedNote));
									setNewNote('')
									})
								}
						
							const toggleImportanceOf = id => {
									const note = notes.find(n => n.id === id)
									const changedNote = { ...note, important: !note.important }
							
									noteService.update(id, changedNote).then(returnedNote => {
										  setNotes(notes.map(n => n.id === id ? returnedNote : n))
										})
	  }
	
	const notesToShow  = showAll ? notes : notes.filter(note => note.important === true)
  return (
		<div>
			<Header header={"Notes"}/>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
				<ul>
					{notesToShow.map(note =>  
					 		<Note key={note.id} 
								note={note} 
								toggleImportance={() => toggleImportanceOf(note.id)}
							/>
						)}
					</ul>
				<form onSubmit={addNote}>
					<input 
						value={newNote}
						onChange={handleNewNote}
						placeholder={"new note..."}
					/>
					<button type='submit'>Save</button>
				</form>
		  	</div>
		  )
		}
		
		export default App