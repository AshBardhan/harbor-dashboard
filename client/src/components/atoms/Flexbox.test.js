import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flexbox from './Flexbox';

describe('Flexbox Component', () => {
	afterEach(cleanup);

	const renderFlexbox = (props) => {
		return render(
			<Flexbox {...props}>
				<div>Child 1</div>
				<div>Child 2</div>
			</Flexbox>
		);
	};

	it('renders children correctly', () => {
		renderFlexbox();
		expect(screen.getByText('Child 1')).toBeInTheDocument();
		expect(screen.getByText('Child 2')).toBeInTheDocument();
	});

	it('applies default flex styles', () => {
		renderFlexbox();
		const flexboxElement = screen.getByText('Child 1').parentElement;
		expect(flexboxElement).toHaveStyle({
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'stretch',
			gap: '0',
			flexWrap: 'nowrap',
		});
	});

	it('applies custom flex styles', () => {
		renderFlexbox({ direction: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px', wrap: 'wrap' });
		const flexboxElement = screen.getByText('Child 1').parentElement;
		expect(flexboxElement).toHaveStyle({
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: '10px',
			flexWrap: 'wrap',
		});
	});

	it('changes flex direction based on breakpoint and window width', () => {
		global.innerWidth = 800;
		renderFlexbox({ breakpoint: 600 });
		let flexboxElement = screen.getByText('Child 1').parentElement;
		expect(flexboxElement).toHaveStyle({
			flexDirection: 'row',
		});

		cleanup();

		global.innerWidth = 500;
		renderFlexbox({ breakpoint: 600 });
		flexboxElement = screen.getByText('Child 1').parentElement;
		expect(flexboxElement).toHaveStyle({
			flexDirection: 'column',
		});
	});

	it('applies additional className and style', () => {
		renderFlexbox({ className: 'custom-class', style: { backgroundColor: 'red' } });
		const flexboxElement = screen.getByText('Child 1').parentElement;
		expect(flexboxElement).toHaveClass('custom-class');
		expect(flexboxElement).toHaveStyle({
			backgroundColor: 'red',
		});
	});
});
