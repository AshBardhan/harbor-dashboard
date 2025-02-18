import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestnetTile from './TestnetTile';
import { Status } from '../../constants/status';

describe('TestnetTile Template Component', () => {
	const mockData = {
		id: '1',
		name: 'Testnet 1',
		status: Status.RUNNING,
		updated_at: '2023-10-01T12:00:00Z',
		testnet_off_chain_actors: [{ status: Status.UPDATING }, { status: Status.STOPPED }],
		testnet_chains: [
			{ chain: 'Ethereum', status: Status.UPDATING },
			{ chain: 'Bitcoin', status: Status.UPDATING },
		],
	};

	it('renders the TestnetTile component with correct name', () => {
		render(<TestnetTile data={mockData} />);
		const nameElement = screen.getByText(/Testnet 1/i);
		expect(nameElement).toBeInTheDocument();
	});

	it('displays the correct status label', () => {
		render(<TestnetTile data={mockData} />);
		const statusLabel = screen.getByText(/Running/i);
		expect(statusLabel).toBeInTheDocument();
	});

	it('displays the modified time correctly', () => {
		render(<TestnetTile data={mockData} />);
		const modifiedTimeText = screen.getByText(/Modified a year ago/i);
		expect(modifiedTimeText).toBeInTheDocument();
	});

	it('disables the settings button when status is UPDATING', () => {
		const updatingData = { ...mockData, status: Status.UPDATING };
		render(<TestnetTile data={updatingData} />);
		const settingsButton = screen.getByRole('button', { name: /Settings/i });
		expect(settingsButton).toBeDisabled();
	});

	it('shows off-chain updating message when there are updating actors', () => {
		const updatingData = { ...mockData, status: Status.UPDATING };
		render(<TestnetTile data={updatingData} />);
		const updatingMessage = screen.getByText(/1 off-chain updating/i);
		expect(updatingMessage).toBeInTheDocument();
	});

	it('shows blockchain updating message when there is an updating chain', () => {
		render(<TestnetTile data={mockData} />);
		const blockchainUpdatingMessage = screen.getByText(/Blockchain updating/i);
		expect(blockchainUpdatingMessage).toBeInTheDocument();
	});
});
