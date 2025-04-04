

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

	const Statistics = (props) => {
		if (props.good === 0 && props.bad === 0 && props.neutral === 0)
			return ( <div>No feedback available</div> );
		else {
		return (
			<div>
			<div>good {props.good}</div>
			<div>neutral {props.neutral}</div>
			<div>bad {props.bad}</div>
			<div>all {props.total}</div>
			<div>average {props.ave}</div>
			<div>positive {props.pos} %</div>
			</div>
		)};
	}
	
	const App = () => {
		// save clicks of each button to its own state
		const [good, setGood] = useState(0);
		const [neutral, setNeutral] = useState(0);
		const [bad, setBad] = useState(0);
		const [ave, setAve] = useState(0);
		const [pos, setPos] = useState(0);
		const [total, setTotal] = useState(0);

		
		const handleGood = () => {
			const updatedGood = good + 1;
			setGood(updatedGood); 
			const updatedTotal = updatedGood + neutral + bad;
			setTotal(updatedTotal);
			setPos((updatedGood / updatedTotal) * 100);
			setAve((updatedGood + -bad) / updatedTotal);
			console.log("Clicked good", updatedGood, "total: ", updatedTotal);
		}
		const handleNeutral = () => {
			const updatedNeutral = neutral + 1;
			setNeutral(updatedNeutral);
			const updatedTotal = good + updatedNeutral + bad;
			setTotal(updatedTotal); 
			setPos((good / updatedTotal) * 100);
			setAve((good + -bad) / updatedTotal);
			console.log("Clicked neutral", updatedNeutral);
		}
		const handleBad = () => {
			const updatedBad = bad + 1;
			setBad(updatedBad); 
			const updatedTotal = good + neutral + updatedBad;
			setTotal(updatedTotal);
			setPos((good / updatedTotal) * 100);
			setAve((good + -updatedBad) / updatedTotal);
			console.log("Clicked bad", updatedBad);
		}
		return (
		<div>
			<RenderHeader text="give feedback"/>
			<Button onClick={handleGood} text="good"/>
			<Button onClick={handleNeutral}text="neutral"/>
			<Button onClick={handleBad} text="bad"/>
			<RenderHeader text="statistics"/>
			<Statistics good={good} neutral={neutral} bad={bad} total={total} pos={pos} ave={ave}/>
		</div>
		)
	}
	
	export default App