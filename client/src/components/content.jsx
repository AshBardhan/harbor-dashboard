import { useEffect, useState } from "react";
import Card from "./card";
import Dropdown from "./dropdown";

export default function Content() {
	  const [items, setItems] = useState([]);
	  const [filteredItems, setFilteredItems] = useState([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState(null);

	  const [sortedValue, setSortedValue] = useState('asc');
	  const [filteredValue, setFilteredValue] = useState('');
	  const [filterOptions, setFilterOptions] = useState([]);
	
	  const SortOptions = [
		{label: 'Name A-Z', value: 'asc'},
		{label: 'Name Z-A', value: 'desc'},
		{label: 'Status', value: 'status'},
		{label: 'Date Created', value: 'created_at'},
		{label: 'Last Modified', value: 'updated_at'},
	  ];

	  useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/testnets`)
		  .then((response) => response.json())
		  .then((data) => {
			let testList = data.data.testnet;
			setItems(testList);
			setFilteredItems(testList);
			const statusCount = Object.entries(
				testList.reduce((acc, { status }) => {
					acc[status] = (acc[status] || 0) + 1;
					return acc;
				  }, {})
			);
	
			setFilterOptions([
				{label: `All (${testList.length})`, value: 'ALL'},
				...statusCount.map(([status, count]) => ({
					label: `${status} (${count})`,
					value: status,
				}))
			]);
			setLoading(false);
		  })
		  .catch((err) => {
			setError(err);
			setLoading(false);
		  });
	  }, []);
	  
	useEffect(() => {
		let filtered = (filteredValue === 'ALL') ? items : items.filter((item) => item.status === filteredValue);
		filtered = filtered.sort((a, b) => {
			switch (sortedValue) {
			  case 'asc':
				return a.name - b.name ? 1 : ((b.name > a.name) ? -1 : 0);
			  case 'desc':
				return b.name - a.name ? 1 : ((a.name > b.name) ? -1 : 0);
			  case 'status':
				return a.status - b.status ? 1 : ((b.status > a.status) ? -1 : 0);
			  case 'created_at':
				return (+new Date(a.created_at) - +new Date(b.created_at));
			  case 'updated_at':
				return (+new Date(a.updated_at) - +new Date(b.updated_at));
			}
		  })
		  setFilteredItems(filtered);
	}, [sortedValue, filteredValue]);
	
	  if (loading) {
		return <div>Loading...</div>;
	  }
	
	  if (error) {
		return <div>Error: {error.message}</div>;
	  }
	
	const onSortChange = (value) => {
		setSortedValue(value);
	};

	const onFilterChange = (value) => {
		setFilteredValue(value);
	};

	return (
		<section>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<h1>Testnets ({filteredItems.length || 0})</h1>
				<div style={{display: 'flex', gap: '10px'}}>
					{
						filterOptions.length > 0 && (
							<div>
								<span>Filter by</span>
								<Dropdown options={filterOptions} onChange={onFilterChange}></Dropdown>
							</div>
						)
					}
					<div>
						<span>Sort by</span>
						<Dropdown options={SortOptions} onChange={onSortChange}></Dropdown>
					</div>
				</div>
			</div>
			<div style={{listStyle: 'none'}}>
				{filteredItems.map((item) => (
					<Card key={item.id} data={item}></Card>
				))}
			</div>
		</section>
	);
}
