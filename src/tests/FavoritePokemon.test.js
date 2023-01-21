import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemon } from '../pages';
import pokemonList from '../data';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemon />);
  const poke = screen.getByText(/No favorite Pokémon found/i);
  expect(poke).toBeInTheDocument();
});
test('Teste se apenas são exibidos os Pokémon favoritados', async () => {
  renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
  const heading = screen.getByRole('heading', { name: /favorite pokémon/i });
  expect(heading).toBeInTheDocument();
  const favo = screen.getByText(/Alakazam/i);
  expect(favo).toBeInTheDocument();
  const Dragonair = screen.getByText(/Dragonair/i);
  expect(Dragonair).toBeInTheDocument();
});
