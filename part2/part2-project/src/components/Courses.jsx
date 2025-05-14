import Course from "./Course"

const MainHeader = () => {
	return <h1>Web Development Curriculum</h1>
}

const Courses = ({ courses }) => {
	return (
	<div>
		<MainHeader/>
		{courses.map(course => 
			<Course key={course.id} course={course}/>
		)}
	</div>
	)
}

export default Courses