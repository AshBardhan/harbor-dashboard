import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Status, StatusColorMapping, statusIconMap, StatusLabelMapping } from '../../constants/status';
import { SortOptions, SortType } from '../../constants/sort';
import TestnetContent from '../templates/TestnetContent';

export default function Testnet() {
	const [items, setItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sortBy, setSortBy] = useState(SortType.ASC);
	const [filterBy, setFilterBy] = useState(Status.ALL);
	const [filterOptions, setFilterOptions] = useState([]);

	const navigate = useNavigate();
	const location = useLocation();

	// Fetch data only once
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
					})),
				]);
				setLoading(false);
			})
			.catch((err) => {
				setError(err);
				setLoading(false);
			});
	}, []);

	useLayoutEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const filterParam = searchParams.get('filterBy');
		const sortParam = searchParams.get('sortBy');
	
		filterParam && setFilterBy(filterParam);
		sortParam && setSortBy(sortParam);
	}, [location.search]);

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		if (filterBy !== Status.ALL) {
			searchParams.set('filterBy', filterBy);
		} else {
			searchParams.delete('filterBy');
		}
		if (sortBy !== SortType.ASC) {
			searchParams.set('sortBy', sortBy);
		} else {
			searchParams.delete('sortBy');
		}

		navigate({
			pathname: location.pathname,
			search: searchParams.toString(),
		});
	}, [filterBy, sortBy, navigate, location.pathname, location.search]);

	useEffect(() => {
		if (items.length === 0) return;

		let filtered = filterBy === Status.ALL ? [...items] : [...items].filter((item) => item.status === filterBy);
		filtered.sort((a, b) => {
			switch (sortBy) {
				case SortType.DESC:
					return b.name.localeCompare(a.name);
				case SortType.STATUS:
					return a.status.localeCompare(b.status);
				case SortType.CREATED_AT:
					return +new Date(a.created_at) - +new Date(b.created_at);
				case SortType.UPDATED_AT:
					return +new Date(a.updated_at) - +new Date(b.updated_at);
				default:
				case SortType.ASC:
					return a.name.localeCompare(b.name);
			}
		});
		setFilteredItems(filtered);
	}, [sortBy, filterBy, items]);

	const onSortChange = (value) => {
		setSortBy(value);
	};

	const onFilterChange = (value) => {
		setFilterBy(value);
	};

	return (
		<>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error: {error.message}</div>
			) : (
				<TestnetContent items={filteredItems} onSortChange={onSortChange} onFilterChange={onFilterChange} sortOptions={SortOptions} filterOptions={filterOptions} sortBy={sortBy} filterBy={filterBy} />
			)}
		</>
	);
}
