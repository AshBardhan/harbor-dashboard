import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Testnet from './Testnets';
import { SampleTestnetsData } from '../../constants/dummy-data';

describe('Testnet Page Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const renderWithRouter = (ui) => {
		return render(<Router>{ui}</Router>);
	};

	it('renders Testnet component without crashing', () => {
		renderWithRouter(<Testnet />);
		const loadingElement = screen.getByText(/Loading.../i);
		expect(loadingElement).toBeInTheDocument();
	});

	it('displays a list of testnets after loading', async () => {
		const mockTestnets = {
			data: {
				testnet: SampleTestnetsData,
			},
		};

		jest.spyOn(global, 'fetch').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockTestnets),
			})
		);

		renderWithRouter(<Testnet />);

		await waitFor(() => {
			const testnetList = screen.getByRole('list');
			expect(testnetList).toBeInTheDocument();
			expect(screen.getByText(/powder-determine/i)).toBeInTheDocument();
			expect(screen.getByText(/did-steep/i)).toBeInTheDocument();
		});

		global.fetch.mockRestore();
	});

	it('displays an error message if data fetching fails', async () => {
		jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Failed to fetch')));

		renderWithRouter(<Testnet />);

		await waitFor(() => {
			const errorMessage = screen.getByText(/Error: Failed to fetch/i);
			expect(errorMessage).toBeInTheDocument();
		});

		global.fetch.mockRestore();
	});

	it('displays a zero state message for an empty list of testnets', async () => {
		const mockTestnets = {
			data: {
				testnet: [],
			},
		};

		jest.spyOn(global, 'fetch').mockImplementation(() =>
			Promise.resolve({
				json: () => Promise.resolve(mockTestnets),
			})
		);

		renderWithRouter(<Testnet />);

		await waitFor(() => {
			expect(screen.getByText(/No testnets found/i)).toBeInTheDocument();
		});

		global.fetch.mockRestore();
	});
});
