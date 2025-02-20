import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Error from './Error';

describe('Error Component', () => {
	it('renders the error message with default size', () => {
		render(<Error>Default Error Message</Error>);
		const errorElement = screen.getByText('Default Error Message');
		expect(errorElement).toBeInTheDocument();
		expect(errorElement).toHaveClass('error');
		expect(errorElement).not.toHaveClass('error--big');
	});

	it('renders the error message with big size', () => {
		render(<Error size="big">Big Error Message</Error>);
		const errorElement = screen.getByText('Big Error Message');
		expect(errorElement).toBeInTheDocument();
		expect(errorElement).toHaveClass('error');
		expect(errorElement).toHaveClass('error--big');
	});
});
