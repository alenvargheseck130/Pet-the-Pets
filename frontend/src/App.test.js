/**
 * "StAuth10244: I Alen Varghese Cheruvally Kunjumon, 000837873 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
 *
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
