import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders basic app', () => {
  render(<App />);
  const textElement = screen.getByText(/Acme frontend/i);
  expect(textElement).toBeInTheDocument();
});
