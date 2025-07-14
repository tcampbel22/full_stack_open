 const Error = ({msg}) => {
	if (msg === null)
		return
	return (
		<div className="msg-container">
			<div className="error">
				{msg}
			</div>
		</div>
	)
}

export default Error