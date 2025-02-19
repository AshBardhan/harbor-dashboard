import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tile from './Tile';

describe('Tile Component', () => {
	it('renders children correctly', () => {
		render(<Tile>Tile Content</Tile>);
		const tileElement = screen.getByText('Tile Content');
		expect(tileElement).toHaveClass('tile');
		expect(tileElement).toBeInTheDocument();
	});

	it('applies the correct theme class', () => {
		render(<Tile theme="error">Themed Tile</Tile>);
		const tileElement = screen.getByText('Themed Tile');
		expect(tileElement).toHaveClass('tile--error');
	});

	it('passes additional props to the tile element', () => {
		render(<Tile data-testid="custom-id">Tile with Props</Tile>);
		const tileElement = screen.getByTestId('custom-id');
		expect(tileElement).toBeInTheDocument();
	});
});
