import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
	const sections = [
		{
			title: 'Section Heading',
			titleIcon: () => <span>Icon1</span>,
			items: [
				{
					id: 'item1',
					title: 'Item 1',
					link: '/item1',
					count: 6,
					icon: () => <span>ItemIcon1</span>,
				},
				{
					id: 'item2',
					title: 'Item 2',
					link: '/item2',
					count: 10,
					icon: () => <span>ItemIcon2</span>,
				},
				{
					id: 'item3',
					title: 'Item 3',
					link: '/item3',
					count: 8,
					icon: () => <span>ItemIcon3</span>,
				},
			],
		},
		{
			backLink: {
				href: '/back',
				text: 'Back',
			},
		},
	];

	const onSiderbarLinkClickMock = jest.fn();

	const renderSidebar = () => {
		return render(
			<Router>
				<Sidebar sections={sections} onSiderbarLinkClick={onSiderbarLinkClickMock} />
			</Router>
		);
	};

	it('renders the sidebar with sections and items', () => {
		renderSidebar();
		const sidebarTitle = screen.getByText('Section Heading');
		const sidebarSections = screen.getAllByTestId('sidebar-section');
		const sidebarLinks = screen.getAllByTestId(/sidebar-link-\d+/);

		expect(sidebarTitle).toBeInTheDocument();
		expect(sidebarSections.length).toBe(sections.length);
		expect(sidebarLinks.length).toBe(sections[0].items.length);
		sections[0].items.forEach((item, index) => {
			const link = screen.getByTestId(`sidebar-link-${index}`);
			expect(link).toBeInTheDocument();
			expect(link.querySelector('.title').textContent).toBe(item.title);
		});
	});

	it('toggles the sidebar visibility when the button is clicked', async () => {
		renderSidebar();
		const toggleSidebarButton = screen.getByTestId('sidebar-slider-button');
		const sidebar = screen.getByTestId('sidebar');

		fireEvent.click(toggleSidebarButton);
		expect(sidebar).not.toHaveClass('hide');

		fireEvent.click(toggleSidebarButton);
		expect(sidebar).toHaveClass('hide');
	});

	it('renders a back link when provided', () => {
		renderSidebar();
		const sidebarBackLink = screen.getByTestId('sidebar-backlink');

		expect(sidebarBackLink).toBeInTheDocument();
		expect(sidebarBackLink.querySelector('.title').textContent).toBe('Back');
		expect(sidebarBackLink).toHaveAttribute('href', '/back');
	});

	it('highlights the selected item', () => {
		renderSidebar();
		const selectedIndex = 1;
		const selectedSideBar = sections[0].items[selectedIndex];
		const selectedSidebarItem = screen.getByTestId(`sidebar-link-${selectedIndex}`);
		const selectedSidebarTitle = selectedSidebarItem.querySelector('.title');
		const selectedSidebarCount = selectedSidebarItem.querySelector('.count');

		expect(selectedSidebarTitle.textContent).toBe(selectedSideBar.title);
		expect(selectedSidebarCount.textContent).toBe(`${selectedSideBar.count}`);
	});

	it('calls onSiderbarLinkClick with correct indices when a sidebar link is clicked', () => {
		renderSidebar();
		const itemIndex = 1;
		const sectionIndex = 0;
		const sidebarLink = screen.getByTestId(`sidebar-link-${itemIndex}`);

		fireEvent.click(sidebarLink);

		expect(onSiderbarLinkClickMock).toHaveBeenCalledWith(itemIndex, sectionIndex);
	});
});
