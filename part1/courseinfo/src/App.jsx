
const Header = (props) => {
	console.log(props)
	return (
		<>
		<p>{props.course}</p>
		</>
	)
}

const Content = (props) => {
	console.log(props)
	return (
		<>
		<Part part_name={props.part[0]} exercises_num={props.num[0]}/>
		<Part part_name={props.part[1]} exercises_num={props.num[1]}/>
		<Part part_name={props.part[2]} exercises_num={props.num[2]}/>
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
	return (
		<>
		<p>Number of exercises {props.total}</p>
		</>
	)
}

const App = () => {
	const course = 'Half Stack application development'
	const part1 = {
	  name: 'Fundamentals of React',
	  exercises: 10
	}
	const part2 = {
	  name: 'Using props to pass data',
	  exercises: 7
	}
	const part3 = {
	  name: 'State of a component',
	  exercises: 14
	}
  
	return (
	  <div>
		<h1><Header course={course}/></h1>
		<Content part={[part1.name, part2.name, part3.name]} num={[part1.exercises, part2.exercises, part3.exercises]}/>
		<Total total={part1.exercises + part2.exercises + part3.exercises}/>
	  </div>
	)
  }
  
  export default App