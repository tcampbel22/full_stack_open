
const Header = (props) => {
	console.log(props)
	return (
		<>
		<h1>{props.course}</h1>
		</>
	)
}

const Content = (props) => {
	console.log(props)
	return (
		<>
		<Part part_name={props.part[0].name} exercises_num={props.part[0].exercises}/>
		<Part part_name={props.part[1].name} exercises_num={props.part[1].exercises}/>
		<Part part_name={props.part[2].name} exercises_num={props.part[2].exercises}/>
		</>
	)
}

const Part = (props) => {
	console.log(props)
	return (
		<>
		<p>{props.part_name} {props.exercises_num}</p>
		</>
	)
}
const Total = (props) => {
	console.log(props)
	const total = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises
	return (
		<>
		<p>Number of exercises {total}</p>
		</>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const parts = [
		{
			name: 'Fundamentals of React',
			exercises: 10
		},
		{
			name: 'Using props to pass data',
			exercises: 7
		},
		{
			name: 'State of a component',
			exercises: 14
		}
	]
  
	return (
	  <div>
		<Header course={course}/>
		<Content part={parts}/>
		<Total total={parts}/>
	  </div>
	)
  }
  
  export default App