const FilterInput = ({handleFilter, newFilter}) => {
	return (
		<div>
			<label htmlFor='filter'>Filter names by</label>
			<input
				id='filter'
				name='filter-type'
				value={newFilter}
				onChange={handleFilter}
				type='text'
				placeholder='enter filter parameters...'
			/>
		</div>
	)
}
export default FilterInput