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

	const renderDropdown = (selected = '') => {
		return render(<Dropdown options={options} selected={selected} label="Test Dropdown" onChange={onChangeMock} />);
	};

	it('renders the dropdown with label and default selected option', () => {
		renderDropdown();

		const dropdownButton = screen.getByTestId('dropdown-button-label');
		const dropdownSelectedLabel = screen.getByTestId('dropdown-button-selected-label');

		expect(dropdownButton).toHaveTextContent('Test Dropdown');
		expect(dropdownSelectedLabel).toHaveTextContent(options[0].label);
	});

	it('renders the dropdown with the correct selected prop', () => {
		renderDropdown('option2');
		const dropdownSelectedLabel = screen.getByTestId('dropdown-button-selected-label');
		expect(dropdownSelectedLabel).toHaveTextContent(options[1].label);
	});

	it('opens and closes the dropdown menu when clicked', () => {
		renderDropdown();

		const dropdownButton = screen.getByTestId('dropdown-button-label');
		const dropdownMenu = screen.getByTestId('dropdown-menu');

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).toHaveClass('open');

		options.forEach((option, index) => {
			const dropdownOption = screen.getByTestId(`dropdown-option-${index}`);
			expect(dropdownOption).toBeVisible();
			expect(dropdownOption).toHaveTextContent(option.label);
		});

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).not.toHaveClass('open');
	});

	it('selects an option and calls onChange', () => {
		renderDropdown();

		const dropdownButton = screen.getByTestId('dropdown-button-label');
		const dropdownSelectedLabel = screen.getByTestId('dropdown-button-selected-label');

		fireEvent.click(dropdownButton);
		fireEvent.click(screen.getByTestId('dropdown-option-2'));

		expect(onChangeMock).toHaveBeenCalledWith(options[2].value);
		expect(dropdownSelectedLabel).toHaveTextContent(options[2].label);
	});

	it('selects an option using the Enter key', () => {
		renderDropdown();

		const dropdownButton = screen.getByTestId('dropdown-button-label');
		const optionToSelect = screen.getByTestId('dropdown-option-2');

		fireEvent.click(dropdownButton);
		fireEvent.keyDown(optionToSelect, { key: 'Enter', code: 'Enter', charCode: 13 });

		const dropdownSelectedLabel = screen.getByTestId('dropdown-button-selected-label');
		expect(dropdownSelectedLabel).toHaveTextContent(options[2].label);
		expect(onChangeMock).toHaveBeenCalledWith(options[2].value);
	});

	it('closes the dropdown when clicking outside', () => {
		renderDropdown();

		const dropdownButton = screen.getByTestId('dropdown-button-label');
		const dropdownMenu = screen.getByTestId('dropdown-menu');

		fireEvent.click(dropdownButton);
		expect(dropdownMenu).toHaveClass('open');

		const outsideElement = document.createElement('div');
		document.body.appendChild(outsideElement);
		fireEvent.click(outsideElement);

		expect(dropdownMenu).not.toHaveClass('open');
		document.body.removeChild(outsideElement);
	});
});
