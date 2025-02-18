import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
	const options = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
	];

	const onChangeMock = jest.fn();

	const renderDropdown = (selected = 'option1') => {
		return render(<Dropdown options={options} selected={selected} label="Test Dropdown" onChange={onChangeMock} />);
	};

	it('renders the dropdown with label and default selected option', () => {
		const { container } = renderDropdown();
		const dropdownButton = container.querySelector('.dropdown-button-label');
		const dropdownSelectedLabel = container.querySelector('.dropdown-button-selected-label');
		expect(dropdownButton.textContent).toBe('Test Dropdown');
		expect(dropdownSelectedLabel.textContent).toBe('Option 1');
	});

	it('opens and closes the dropdown menu when clicked', () => {
		const { container } = renderDropdown();
		const dropdownButton = container.querySelector('.dropdown-button-label');
		const dropdownMenu = container.querySelector('.dropdown-menu');
		const dropdownOptions = container.querySelectorAll('.dropdown-menu-option');

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).toHaveClass('open');

		expect(dropdownOptions.length).toBe(options.length);
		dropdownOptions.forEach((option, index) => {
			expect(option).toBeVisible();
			expect(option.textContent).toBe(options[index].label);
		});

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).not.toHaveClass('open');
	});

	it('selects an option and calls onChange', () => {
		const { container } = renderDropdown();
		const dropdownButton = container.querySelector('.dropdown-button-label');
		const dropdownOptions = container.querySelectorAll('.dropdown-menu-option');
		const dropdownSelectedLabel = container.querySelector('.dropdown-button-selected-label');

		fireEvent.click(dropdownButton);
		fireEvent.click(dropdownOptions[2]);
		expect(onChangeMock).toHaveBeenCalledWith(options[2].value);
		expect(dropdownSelectedLabel.textContent).toBe(options[2].label);
	});

	it('closes the dropdown when clicking outside', () => {
		const { container } = renderDropdown();
		const dropdownButton = container.querySelector('.dropdown-button-label');
		const dropdownMenu = container.querySelector('.dropdown-menu');
		const outsideElement = document.createElement('div');

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).toHaveClass('open');

		document.body.appendChild(outsideElement);
		fireEvent.click(outsideElement);
		expect(dropdownMenu).not.toHaveClass('open');

		document.body.removeChild(outsideElement);
	});
});
