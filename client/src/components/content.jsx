import { useEffect, useState } from "react";
import Card from "./card";
import Dropdown from "./dropdown";
import Text from "./text";
import { Status, StatusColorMapping, statusIconMap, StatusLabelMapping } from "../constants/status";
import { SortOptions, SortType } from "../constants/sort";
import Flexbox from "./flexbox";
import { ReactComponent as AddIcon } from '../assets/icons/add.svg';

export default function Content() {
	  const [items, setItems] = useState([]);
	  const [filteredItems, setFilteredItems] = useState([]);
	  const [loading, setLoading] = useState(true);
	  const [error, setError] = useState(null);

	  const [sortedValue, setSortedValue] = useState(SortType.ASC);
	  const [filteredValue, setFilteredValue] = useState(Status.ALL);
	  const [filterOptions, setFilterOptions] = useState([]);

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
		let filtered = (filteredValue === Status.ALL) ? [...items] : [...items].filter((item) => item.status === filteredValue);
		filtered.sort((a, b) => {
			switch (sortedValue) {
				case SortType.DESC:
					return b.name.localeCompare(a.name);
				case SortType.STATUS:
					return a.status.localeCompare(b.status);
				case SortType.CREATED_AT:
					return (+new Date(a.created_at) - +new Date(b.created_at));
				case SortType.UPDATED_AT:
					return (+new Date(a.updated_at) - +new Date(b.updated_at));
				default:
				case SortType.ASC:
					return a.name.localeCompare(b.name);
			}
		  });
		  setFilteredItems(filtered);
	}, [sortedValue, filteredValue, items]);
	
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
			<Flexbox alignItems="center" justifyContent="space-between" style={{marginBottom: '20px'}}>
				<Flexbox alignItems="center" gap="20px">
					<Text type="h2">Testnets ({filteredItems.length || 0})</Text>
					<button type='button' className='inline-button inline-button--big'>
						<AddIcon width="14" height="14" fill="currentColor" />
						<span>New Testnet</span>
					</button>
				</Flexbox>
				<Flexbox  alignItems="center" gap="10px">
					{filterOptions.length > 0 && (
						<>
							<Dropdown label="Filter by:" options={filterOptions} onChange={onFilterChange}></Dropdown>
							<span className="dot"></span>
						</>
					)}
					<Dropdown label="Sort by:" options={SortOptions} onChange={onSortChange}></Dropdown>
				</Flexbox>
			</Flexbox>
			{filteredItems.map((item) => (
				<Card key={item.id} data={item}></Card>
			))}
		</>
	);
}
