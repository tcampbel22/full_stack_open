
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
		<p>{props.part} {props.num}</p>
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
	const part1 = 'Fundamentals of React'
	const exercises1 = 10
	const part2 = 'Using props to pass data'
	const exercises2 = 7
	const part3 = 'State of a component'
	const exercises3 = 14
  
	return (
	  <div>
		<h1><Header course={course}/></h1>
		<Content part={part1} num={exercises1}/>
		<Content part={part2} num={exercises2}/>
		<Content part={part3} num={exercises3}/>
		<Total total={exercises1 + exercises2 + exercises3}/>
	  </div>
	)
  }
  
  export default App