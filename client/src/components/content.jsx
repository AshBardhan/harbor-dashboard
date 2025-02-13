import { useEffect, useState } from "react";
import Card from "./card";
import Dropdown from "./dropdown";
import Text from "./text";
import { Status, StatusColorMapping, statusIconMap, StatusLabelMapping } from "../constants/status";
import { SortOptions, SortType } from "../constants/sort";

export default function Content() {
	  const [items, setItems] = useState([]);
	  const [filteredItems, setFilteredItems] = useState([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState(null);

	  const [sortedValue, setSortedValue] = useState(SortType.ASC);
	  const [filteredValue, setFilteredValue] = useState('');
	  const [filterOptions, setFilterOptions] = useState([]);

	   const StatusIcon = ({ status, size = 20 }) => {
			const IconComponent = statusIconMap[status] || null;
		  return IconComponent ? <IconComponent width="14" height="14" /> : null;
		};
	
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
				{
					label: `${StatusLabelMapping[Status.ALL]} (${testList.length})`,
					value: Status.ALL,
					color: StatusColorMapping[Status.ALL],
					icon: statusIconMap[Status.ALL],
				},
				...statusCount.map(([status, count]) => ({
					label: `${StatusLabelMapping[status]} (${count})`,
					value: status,
					color: StatusColorMapping[status],
					icon: statusIconMap[status],
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
		let filtered = (filteredValue === Status.ALL) ? items : items.filter((item) => item.status === filteredValue);
		filtered = filtered.sort((a, b) => {
			switch (sortedValue) {
				case SortType.DESC:
					return b.name - a.name ? 1 : ((a.name > b.name) ? -1 : 0);
				case SortType.STATUS:
					return a.status - b.status ? 1 : ((b.status > a.status) ? -1 : 0);
				case SortType.CREATED_AT:
					return (+new Date(a.created_at) - +new Date(b.created_at));
				case SortType.UPDATED_AT:
					return (+new Date(a.updated_at) - +new Date(b.updated_at));
				default:
				case SortType.ASC:
					return a.name - b.name ? 1 : ((b.name > a.name) ? -1 : 0);
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
		<>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<Text type="h1">Testnets ({filteredItems.length || 0})</Text>
				<div style={{display: 'flex', gap: '10px'}}>
					{
						filterOptions.length > 0 && (
							<div>
								<Text type="span">Filter by</Text>
								<Dropdown options={filterOptions} onChange={onFilterChange}></Dropdown>
							</div>
						)
					}
					<div>
						<Text type="span">Sort by</Text>
						<Dropdown options={SortOptions} onChange={onSortChange}></Dropdown>
					</div>
				</div>
			</div>
			<div style={{listStyle: 'none'}}>
				{filteredItems.map((item) => (
					<Card key={item.id} data={item}></Card>
				))}
			</div>
		</>
	);
}
