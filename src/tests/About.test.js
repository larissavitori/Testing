import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', { name: /home/i });
  expect(home).toBeInTheDocument();
  const About = screen.getByRole('link', { name: /About/i });
  expect(About).toBeInTheDocument();
  const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(favorite).toBeInTheDocument();
});
