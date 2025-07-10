import { useState, useEffect } from 'react'
import noteService from "./services/notes"
import Footer from './components/Footer'

const Header = ({header}) => { return <h2>{header}</h2> }


const Notification = ({ message }) => {
	if (message === null)
		return null
	return (
		<div className='error'>
			{message}
		</div>
	)
}

const Note = ({ note, toggleImportance }) => { 
	const label = note.important ? 'make not important' : 'make important'
	return (
		<li className='note'>
			{note.content}
			<button onClick={toggleImportance}>{label}</button>
		</li>  
	)
}

const NoteApp = () => {
		const [notes, setNotes] = useState([])
		const [newNote, setNewNote] = useState('')
		const [showAll, setShowAll] = useState(true);
		const [errorMessage, setErrorMessage] = useState(null);
		
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
			})}
					
		const toggleImportanceOf = id => {
				const note = notes.find(n => n.id === id)
				const changedNote = { ...note, important: !note.important }
		
				noteService.update(id, changedNote).then(returnedNote => {
						setNotes(notes.map(n => n.id === id ? returnedNote : n))
				})
				.catch(error => {
					setErrorMessage(`Note '${note.content}' was already removed from server: ${error}`)
					setTimeout(() => { setErrorMessage(null) }, 5000)
					setNotes(notes.filter(n => n.id !== id))
				})
		}
	const notesToShow  = showAll ? notes : notes.filter(note => note.important === true)
		
  return (
		<div>
			<Header header={"Notes"}/>
			<Notification message={errorMessage}/>
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
				<Footer/>
		  	</div>
		  )
		}
	
	export default NoteApp