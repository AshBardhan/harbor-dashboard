import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestnetContent from './TestnetContent';
import { SampleTestnetListData } from '../../constants/dummy-data';

describe('TestnetContent Component', () => {
	const mockItems = SampleTestnetListData;
	const mockFilterOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'active', label: 'Active' },
	];
	const mockSortOptions = [
		{ value: 'name', label: 'Name' },
		{ value: 'date', label: 'Date' },
	];
	const mockOnSortChange = jest.fn();
	const mockOnFilterChange = jest.fn();

	const renderComponent = (items = mockItems) => {
		return render(
			<TestnetContent items={items} filterOptions={mockFilterOptions} sortOptions={mockSortOptions} sortBy="name" filterBy="all" onSortChange={mockOnSortChange} onFilterChange={mockOnFilterChange} />
		);
	};

	it('renders the testnet list with items', () => {
		renderComponent();

		const testnetList = screen.getByTestId('testnet-list');
		expect(testnetList).toBeInTheDocument();
		expect(testnetList.children.length).toBe(mockItems.length);
	});

	it('renders the correct number of testnets', () => {
		renderComponent();

		const headerText = screen.getByText(`Testnets (${mockItems.length})`);
		expect(headerText).toBeInTheDocument();
	});

	it('renders "No testnets found" when items list is empty', () => {
		renderComponent([]);
		expect(screen.getByText('No testnets found')).toBeInTheDocument();
	});

	it('displays both sort and filter dropdown buttons', () => {
		renderComponent();

		const sortDropdownButton = screen.getByText('Sort by:');
		const filterDropdownButton = screen.getByText('Filter by:');

		expect(sortDropdownButton).toBeInTheDocument();
		expect(filterDropdownButton).toBeInTheDocument();
	});

	it('calls onSortChange when a new option from sort dropdown button is chosen', () => {
		renderComponent();

		const sortDropdownButton = screen.getByText('Sort by:');
		fireEvent.click(sortDropdownButton);
		fireEvent.click(screen.getByText('Date'));

		expect(mockOnSortChange).toHaveBeenCalledWith('date');
	});

	it('calls onFilterChange when a new option from filter dropdown button is chosen', () => {
		renderComponent();

		const filterDropdownButton = screen.getByText('Filter by:');
		fireEvent.click(filterDropdownButton);
		fireEvent.click(screen.getByText('Active'));

		expect(mockOnFilterChange).toHaveBeenCalledWith('active');
	});
});
