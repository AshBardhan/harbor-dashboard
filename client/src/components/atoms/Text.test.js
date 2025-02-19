import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Text from './Text';

describe('Text Component', () => {
	it('renders the text with default type as span', () => {
		render(<Text>Sample Text</Text>);
		const textElement = screen.getByText('Sample Text');
		expect(textElement.tagName).toBe('SPAN');
		expect(textElement).toBeInTheDocument();
	});

	it('renders the text with specified type', () => {
		render(<Text type="h1">Heading Text</Text>);
		const textElement = screen.getByText('Heading Text');
		expect(textElement.tagName).toBe('H1');
		expect(textElement).toBeInTheDocument();
	});

	it('applies custom font weight', () => {
		render(<Text fontWeight="bold">Bold Text</Text>);
		const textElement = screen.getByText('Bold Text');
		expect(textElement).toHaveStyle({ fontWeight: 'bold' });
	});

	it('applies additional className and style', () => {
		render(
			<Text className="custom-class" style={{ color: 'red' }}>
				Styled Text
			</Text>
		);
		const textElement = screen.getByText('Styled Text');
		expect(textElement).toHaveClass('custom-class');
		expect(textElement).toHaveStyle({ color: 'red' });
	});

	it('passes additional props to the element', () => {
		render(<Text data-testid="custom-id">Text with Props</Text>);
		const textElement = screen.getByTestId('custom-id');
		expect(textElement).toBeInTheDocument();
	});
});
