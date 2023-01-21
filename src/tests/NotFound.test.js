import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemon } from '../pages';

test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
  renderWithRouter(<FavoritePokemon />);
  const poke = screen.getByText(/No favorite Pokémon found/i);
  expect(poke).toBeInTheDocument();
});
