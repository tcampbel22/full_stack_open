
const Added = ({ msg }) => {
	if (msg === null)
		return null
	return (
		<div className="msg-container">
			<div className="added">
				{msg}
			</div>
		</div>
	)
}

export default Added