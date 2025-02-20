import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './Loading';

describe('Loading Component', () => {
	it('renders the loading message with default size', () => {
		render(<Loading />);
		const loadingMessage = screen.getByText('Loading...');
		const loadingIcon = screen.getByTestId('loading-icon');

		expect(loadingMessage).toBeInTheDocument();
		expect(loadingMessage).toHaveClass('loading-message');
		expect(loadingMessage).not.toHaveClass('loading-message--big');
		expect(loadingIcon).toBeInTheDocument();
		expect(loadingIcon).toHaveClass('loading-icon');
		expect(loadingIcon).not.toHaveClass('loading-icon--big');
	});

	it('renders the loading message with custom message with bigger size', () => {
		render(<Loading message="Please wait..." size="big" />);
		const loadingMessage = screen.getByText('Please wait...');
		const loadingIcon = screen.getByTestId('loading-icon');

		expect(loadingMessage).toBeInTheDocument();
		expect(loadingMessage).toHaveClass('loading-message');
		expect(loadingMessage).toHaveClass('loading-message--big');
		expect(loadingIcon).toBeInTheDocument();
		expect(loadingIcon).toHaveClass('loading-icon');
		expect(loadingIcon).toHaveClass('loading-icon--big');
	});
});
