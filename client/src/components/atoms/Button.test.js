import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button Component', () => {
	it('renders the button with children', () => {
		render(<Button>Normal Button</Button>);
		const buttonElement = screen.getByText('Normal Button');
		expect(buttonElement).toHaveClass('button');
		expect(buttonElement).toBeInTheDocument();
	});

	it('applies the correct theme and size variant classes', () => {
		render(
			<Button theme="primary" size="big">
				Styled Button
			</Button>
		);
		const buttonElement = screen.getByText('Styled Button');
		expect(buttonElement).toHaveClass('button--primary');
		expect(buttonElement).toHaveClass('button--big');
	});

	it('calls the onClick handler when clicked', () => {
		const onClickMock = jest.fn();
		render(<Button onClick={onClickMock}>Click Me</Button>);
		const buttonElement = screen.getByText('Click Me');
		fireEvent.click(buttonElement);
		expect(onClickMock).toHaveBeenCalledTimes(1);
	});

	it('renders as a link when href is provided', () => {
		render(<Button href="https://example.com">Link Button</Button>);
		const linkElement = screen.getByText('Link Button');
		expect(linkElement.tagName).toBe('A');
		expect(linkElement).toHaveAttribute('href', 'https://example.com');
		expect(linkElement).toBeInTheDocument();
	});

	it('is disabled when the disabled prop is true', () => {
		render(<Button disabled>Disabled Button</Button>);
		const buttonElement = screen.getByText('Disabled Button');
		expect(buttonElement).toBeDisabled();
	});
});
