// import Course from "./components/Course"


const Course = ({ course }) => {
	return (
	<div>
		<Header name={course.name}/>
		<Content parts={course.parts}/>
	</div>
	)
}
const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => 
		<Part key={part.id} part={part}/>
	)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => <p>Number of exercises {total}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
	parts: [
		{
		  name: 'Fundamentals of React',
		  exercises: 10,
		  id: 1
		},
		{
		  name: 'Using props to pass data',
		  exercises: 7,
		  id: 2
		},
		{
		  name: 'State of a component',
		  exercises: 14,
		  id: 3
		}
	  ]
  }

  return <Course course={course}/>
}

export default App