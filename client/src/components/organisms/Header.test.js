import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactComponent as DocsIcon } from '../../assets/icons/docs.svg';
import { ReactComponent as ProjectsIcon } from '../../assets/icons/projects.svg';

describe('Header Component', () => {
	const mockNavItems = [
		{ href: '/docs', label: 'Docs', icon: DocsIcon },
		{ href: '/projects', label: 'Projects', icon: ProjectsIcon, align: 'right' },
	];

	const renderHeader = () => {
		return render(
			<Router>
				<Header logoSrc="logo.png" navItems={mockNavItems} />
			</Router>
		);
	};

	it('renders the main logo', () => {
		renderHeader();
		const logo = screen.getByAltText('Logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'logo.png');
	});

	it('renders all navigation items', () => {
		renderHeader();
		mockNavItems.forEach((item) => {
			const navItem = screen.getByText(item.label);
			const navItemLink = navItem.closest('a');
			expect(navItem).toBeInTheDocument();
			expect(navItemLink).toBeInTheDocument();
			expect(navItemLink).toHaveAttribute('href', item.href);
			expect(navItemLink).toHaveClass('page-header-nav-item');
			if (item.align === 'right') {
				expect(navItemLink).toHaveClass('page-header-nav-item--right');
			} else {
				expect(navItemLink).not.toHaveClass('page-header-nav-item--right');
			}
		});
	});
});
