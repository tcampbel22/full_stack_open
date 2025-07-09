const FilterInput = ({handleFilter, newFilter}) => {
	return (
		<div className="filter">
			<input
				id='filter'
				name='filter-type'
				value={newFilter}
				onChange={handleFilter}
				type='text'
				placeholder='enter name to filter...'
			/>
		</div>
	)
}
export default FilterInput