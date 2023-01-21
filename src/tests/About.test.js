import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
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
test('Teste se a aplicação é redirecionada para a página inicial', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/home/i));
  const homeTitle = screen.getByRole(
    'heading',
    { name: 'Encountered Pokémon' },
  );
  expect(homeTitle).toBeInTheDocument();
});
test('a aplicação é redirecionada para a página de About', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const AboutTitle = screen.getByRole(
    'heading',
    { name: 'About Pokédex' },
  );
  expect(AboutTitle).toBeInTheDocument();
});
test('a aplicação é redirecionada para a página de Pokémon Favoritados', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/favorite pokémon/i));
  const favorite = screen.getByRole(
    'heading',
    { name: 'Favorite Pokémon' },
  );
  expect(favorite).toBeInTheDocument();
});
test('Teste se a aplicação é redirecionada para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  const not = '/xablau';
  act(() => {
    history.push(not);
  });
  const notFound = screen.getByRole(
    'heading',
    { name: 'Page requested not found' },
  );
  expect(notFound).toBeInTheDocument();
});
