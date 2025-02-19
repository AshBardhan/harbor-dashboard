import React from 'react';
import PropTypes from 'prop-types';
import TestnetTile from './TestnetTile';
import Dropdown from '../molecules/Dropdown';
import Text from '../atoms/Text';
import Flexbox from '../atoms/Flexbox';
import { ReactComponent as AddIcon } from '../../assets/icons/add.svg';
import Button from '../atoms/Button';

const TestnetContent = ({ items, filterOptions, sortOptions, sortBy, filterBy, onSortChange, onFilterChange }) => {
	return (
		<>
			<Flexbox alignItems="center" justifyContent="space-between" gap="12px" breakpoint={1024} style={{ marginBottom: '20px' }}>
				<Flexbox alignItems="center" gap="20px">
					<Text type="h2">Testnets ({items.length || 0})</Text>
					<Button type="button" theme="primary" size="big">
						<AddIcon width="14" height="14" />
						<Text>New Testnet</Text>
					</Button>
				</Flexbox>
				{items && items.length && (
					<Flexbox alignItems="center" wrap="wrap" gap="12px">
						{filterOptions.length > 0 && (
							<>
								<Dropdown label="Filter by:" options={filterOptions} selected={filterBy} onChange={onFilterChange} />
								<span className="dot"></span>
							</>
						)}
						<Dropdown label="Sort by:" options={sortOptions} selected={sortBy} onChange={onSortChange} />
					</Flexbox>
				)}
			</Flexbox>
			{items && items.length ? (
				<div data-testid="testnet-list">
					{items.map((item) => (
						<TestnetTile key={item.id} data={item} />
					))}
				</div>
			) : (
				<div>No testnets found</div>
			)}
			{}
		</>
	);
};

TestnetContent.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	filterOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	sortOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
	sortBy: PropTypes.string.isRequired,
	filterBy: PropTypes.string.isRequired,
	onSortChange: PropTypes.func.isRequired,
	onFilterChange: PropTypes.func.isRequired,
};

export default TestnetContent;
