import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Teste se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const poke = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
  expect(poke).toBeInTheDocument();
});
test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const poke = screen.getByRole('heading', { name: /about pokédex/i });
  expect(poke).toBeInTheDocument();
});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const pokemon = screen.getByRole('heading', { level: 2 });
  expect(pokemon).toBeInTheDocument();
});
test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const image = screen.getByAltText('Pokédex');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
