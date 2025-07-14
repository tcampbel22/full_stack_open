 const Error = ({msg}) => {
	if (msg === null)
		return
	return (
		<div className="error">
			{msg}
		</div>
	)
}

export default Error