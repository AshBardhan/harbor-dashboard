import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
					selected: true,
				},
				{
					id: 'item2',
					title: 'Item 2',
					link: '/item2',
					icon: () => <span>ItemIcon2</span>,
				},
				{
					id: 'item3',
					title: 'Item 3',
					link: '/item3',
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

	const renderSidebar = () => {
		return render(
			<Router>
				<Sidebar sections={sections} />
			</Router>
		);
	};

	it('renders the sidebar with sections and items', () => {
		const { container } = renderSidebar();
		const sidebarTitle = container.querySelector('.page-sidebar-title span:last-child');
		const sidebarSections = container.querySelectorAll('.page-sidebar-section');
		const sidebarLinks = container.querySelectorAll('.page-sidebar-link');

		expect(sidebarTitle).toBeInTheDocument();
		expect(sidebarTitle.textContent).toBe('Section Heading');
		expect(sidebarSections.length).toBe(sections.length);
		expect(sidebarLinks.length).toBe(sections[0].items.length);
		sidebarLinks.forEach((link, index) => {
			expect(link).toBeInTheDocument();
			expect(link.querySelector('.title').textContent).toBe(sections[0].items[index].title);
		});
	});

	it('toggles the sidebar visibility when the button is clicked', async () => {
		const { container } = renderSidebar();
		const togglePageSidebarSliderButton = container.querySelector('.page-sidebar-slider-button .action-button');
		const sidebar = container.querySelector('.page-sidebar');

		fireEvent.click(togglePageSidebarSliderButton);
		expect(sidebar).not.toHaveClass('hide');

		fireEvent.click(togglePageSidebarSliderButton);
		expect(sidebar).toHaveClass('hide');
	});

	it('renders a back link when provided', () => {
		const { container } = renderSidebar();
		const sidebarBackLink = container.querySelector('.page-sidebar-backlink');

		expect(sidebarBackLink).toBeInTheDocument();
		expect(sidebarBackLink.querySelector('.title').textContent).toBe('Back');
		expect(sidebarBackLink).toHaveAttribute('href', '/back');
	});

	it('highlights the selected item', () => {
		const { container } = renderSidebar();
		const selectedSidebarItem = container.querySelector('.page-sidebar-link.selected');
		const selectedSidebarTitle = selectedSidebarItem.querySelector('.title');
		const selectedSidebarCount = selectedSidebarItem.querySelector('.count');
		const selectedSideBar = sections[0].items.find((item) => item.selected);

		expect(selectedSidebarTitle).toBeInTheDocument();
		expect(selectedSidebarTitle.textContent).toBe(selectedSideBar.title);
		expect(selectedSidebarCount).toBeInTheDocument();
		expect(selectedSidebarCount.textContent).toBe(`${selectedSideBar.count}`);
	});
});
