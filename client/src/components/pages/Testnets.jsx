import { useEffect, useState, useLayoutEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Status, StatusColorMapping, statusIconMap, StatusLabelMapping } from '../../constants/status';
import { SortOptions, SortType } from '../../constants/sort';
import TestnetContent from '../templates/TestnetContent';
import Loading from '../atoms/Loading';
import Error from '../atoms/Error';

const Testnets = () => {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [sortBy, setSortBy] = useState(SortType.ASC);
	const [filterBy, setFilterBy] = useState(Status.ALL);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const fetchTestnets = async () => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/testnets`);
				const data = await response.json();
				setItems(data.data.testnet);
			} catch (err) {
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchTestnets();
	}, []);

	useLayoutEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const filterParam = searchParams.get('filterBy');
		const sortParam = searchParams.get('sortBy');

		if (filterParam) setFilterBy(filterParam);
		if (sortParam) setSortBy(sortParam);
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

		navigate({ pathname: location.pathname, search: searchParams.toString() });
	}, [filterBy, sortBy, navigate, location.pathname, location.search]);

	const filteredItems = useMemo(() => {
		if (items.length === 0) return [];
		let filtered = filterBy === Status.ALL ? [...items] : items.filter((item) => item.status === filterBy);
		return filtered.sort((a, b) => {
			switch (sortBy) {
				case SortType.DESC:
					return b.name.localeCompare(a.name);
				case SortType.STATUS:
					return a.status.localeCompare(b.status);
				case SortType.CREATED_AT:
					return new Date(a.created_at) - new Date(b.created_at);
				case SortType.UPDATED_AT:
					return new Date(a.updated_at) - new Date(b.updated_at);
				default:
				case SortType.ASC:
					return a.name.localeCompare(b.name);
			}
		});
	}, [sortBy, filterBy, items]);

	const filterOptions = useMemo(() => {
		const statusCount = Object.entries(
			items.reduce((acc, { status }) => {
				acc[status] = (acc[status] || 0) + 1;
				return acc;
			}, {})
		);

		return [
			{
				label: `${StatusLabelMapping[Status.ALL]}`,
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
		];
	}, [items]);

	const onSortChange = useCallback((value) => setSortBy(value), []);
	const onFilterChange = useCallback((value) => setFilterBy(value), []);

	return (
		<>
			{loading ? (
				<Loading size="big" message="Loading Testnets..." />
			) : error ? (
				<Error size="big">
					<div>Unable to fetch Testnets.</div>
					<div>Try again later</div>
				</Error>
			) : (
				<TestnetContent
					items={filteredItems}
					onSortChange={onSortChange}
					onFilterChange={onFilterChange}
					sortOptions={SortOptions}
					filterOptions={filterOptions}
					sortBy={sortBy}
					filterBy={filterBy}
				/>
			)}
		</>
	);
};

export default Testnets;
