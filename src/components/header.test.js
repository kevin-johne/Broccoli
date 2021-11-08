import { render, screen } from '@testing-library/react';
import Header from "./header";

test('should have a logo', () => {
  render(<Header />);
  const element = screen.queryByAltText(/Farmdrop Logo/i);
  expect(element).toBeInTheDocument();
});

test('should have an empty basket', () => {
  render(<Header/>);
  const element = screen.queryByText(/0/i);
  expect(element).toBeInTheDocument();
})
