

// const Header = (props) => {
	// 	console.log(props)
	// 	return (
// 		<>
// 		<h1>{props.course.name}</h1>
// 		</>
// 	)
// }

// const Content = (props) => {
	// 	console.log(props)
	// 	return (
		// 		<>
// 		<Part part_name={props.part[0].name} exercises_num={props.part[0].exercises}/>
// 		<Part part_name={props.part[1].name} exercises_num={props.part[1].exercises}/>
// 		<Part part_name={props.part[2].name} exercises_num={props.part[2].exercises}/>
// 		</>
// 	)
// }

// const Part = (props) => {
	// 	console.log(props)
	// 	return (
		// 		<>
// 		<p>{props.part_name} {props.exercises_num}</p>
// 		</>
// 	)
// }
// const Total = (props) => {
// 	console.log(props)
// 	const total = props.total[0].exercises + props.total[1].exercises + props.total[2].exercises
// 	return (
	// 		<>
	// 		<p>Number of exercises {total}</p>
// 		</>
// 	)
// }

// const App = () => {
// 	const course = {
	// 		name: 'Half Stack application development',
	// 		parts: [
		// 			{
			// 				name: 'Fundamentals of React',
// 				exercises: 10
// 			},
// 			{
// 				name: 'Using props to pass data',
// 				exercises: 7
// 			},
// 			{
// 				name: 'State of a component',
// 				exercises: 14
// 			}
// 		]
// 	}
// 	return (
	// 	  <div>
	// 		<Header course={course}/>
	// 		<Content part={course.parts}/>
	// 		<Total total={course.parts}/>
	// 	  </div>
	// 	)
	//   }
	
	
	// const Display = ({counter}) => {
	// 	return (
		// 		<div>{counter}</div>
		// 	)
		// }
		
		// const Button = (props) => {
			// 	return (
				// 		<button onClick={props.onClick}>
				// 			{props.text}
				// 		</button>
				// 	)
				// }
				
				// const App = () => {
					// 	const [ counter, setCounter ] = useState(0)
					//     console.log('rendering with counter value', counter)
					// 	const increaseByOne = () => {
						// 		console.log('increasing, value before', counter)
						// 		setCounter(counter + 1);
						// 	}
						// 	const decreaseByOne = () => {
	// 		console.log('decreasing, value before', counter)
	// 		setCounter(counter - 1);
	// 	}
	//     const resetCounter = () => {
		// 		console.log('resetting to zero', counter)
		// 		setCounter(0);
		// 	}
		
		
		// 	return (
			// 	  <div>
			// 		<Display counter={counter}/>
			
			// 		<Button onClick={increaseByOne} text='plus'/>
			// 		<Button onClick={resetCounter} text='zero'/>
			// 		<Button onClick={decreaseByOne} text='minus'/>
			
			// 	  </div>
			// 	)
			//   }
			
			// import { useState } from 'react';
			
			// const App = () => {
// 	const [clicks, setClicks] = useState({ left: 0, right: 0 })

// 	const handleLeftClick = () => {
	// 		setClicks({ ...clicks, left: clicks.left + 1 });
	// 	}
	
	// 	const handleRightClick = () => {
		// 		setClicks({ ...clicks, right: clicks.right + 1 });
		// 	}
		
		// 	return (
			// 	  <div>
			// 		{clicks.left}
			// 		<button onClick={handleLeftClick}>
			// 		  left
			// 		</button>
			// 		<button onClick={handleRightClick}>
			// 		  right
			// 		</button>
			// 		{clicks.right}
			// 	  </div>
			// 	)
			//   }
			
			//   export default App
import { useState } from 'react'
	
	const RenderHeader = ({text}) => {
		return (
		<h1>{text}</h1>
		)
	}

	const Button = (props) => {
		return (
			<button onClick={props.onClick}>{props.text}</button>
		)
	}

	const RenderStats = (props) => {
		return (
			<div>
			<div>good {props.good}</div>
			<div>neutral {props.neutral}</div>
			<div>bad {props.bad}</div>
			</div>
		)
	}
	
	const App = () => {
		// save clicks of each button to its own state
		const [good, setGood] = useState(0);
		const [neutral, setNeutral] = useState(0);
		const [bad, setBad] = useState(0);
		
		const handleGood = () => {setGood(good + 1); console.log("Clicked good", good);}
		const handleNeutral = () => {setNeutral(neutral + 1); console.log("Clicked neutral", neutral);}
		const handleBad = () => {setBad(bad + 1); console.log("Clicked bad", bad);}
		return (
		<div>
			<RenderHeader text="give feedback"/>
			<Button onClick={handleGood} text="good" />
			<Button onClick={handleNeutral}text="neutral"/>
			<Button onClick={handleBad} text="bad"/>
			<RenderHeader text="statistics"/>
			<RenderStats good={good} neutral={neutral} bad={bad}/>
		</div>
		)
	}
	
	export default App