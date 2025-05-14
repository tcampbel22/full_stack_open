const Course = ({ course }) => {
	return (
	<div>
		<Header name={course.name}/>
		<Content parts={course.parts}/>

		<Total parts={course.parts}/>
	</div>
	)
}
const Header = ({ name }) => <h2>{name}</h2>

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

const Total = ({ parts }) => {
	let total = 0;
	total = parts.map(part => part.exercises).reduce((s, p) => s + p, total)
	return (
		<b>
			Number of Exercises {total}
		</b>

	)
}


export default Course