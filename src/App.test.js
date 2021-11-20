import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Richie's Noughts And Crosses/i);
  expect(linkElement).toBeInTheDocument();
});
