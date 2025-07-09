
const Added = ({ msg }) => {
	if (msg === null)
		return null
	return (
		<div className="added">
			{msg}
		</div>
	)
}

export default Added