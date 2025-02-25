import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BadgeList from './BadgeList';

describe('BadgeList Component', () => {
	const mockList = [
		'https://example.com/badge1.png',
		'https://example.com/badge2.png',
		'https://example.com/badge3.png',
	];

	const renderBadgeList = (list = mockList) => {
		return render(<BadgeList list={list} />);
	};

	it('renders the correct number of badges', () => {
		renderBadgeList();
		const badgeElements = screen.getAllByRole('img');
		expect(badgeElements.length).toBe(mockList.length);
	});

	it('renders badges with correct attribute values', () => {
		renderBadgeList();
		const badgeElements = screen.getAllByRole('img');
		badgeElements.forEach((badgeElement, index) => {
			expect(badgeElement).toHaveAttribute('src', mockList[index]);
			expect(badgeElement).toHaveAttribute('alt', `Badge ${index}`);
			expect(badgeElement).toHaveAttribute('width', '16');
			expect(badgeElement).toHaveAttribute('height', '16');
		});
	});
});
