import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import PokemonButtonsPanel from '../components/PokemonButtonsPanel';
import { Pokemon } from '../components';
import { Pokedex } from '../pages';
import pokemonList from '../data';
// import { Pokedex } from '../pages';

test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
  expect(h2).toBeInTheDocument();
});
test('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
  renderWithRouter(<App />);
  const button = screen.getByRole('heading', { name: /encountered pokémon/i });
  userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  const proximo = screen.getByTestId('next-pokemon');
  expect(button).toBeInTheDocument();
  expect(proximo).toBeInTheDocument();
});
test('Os próximos Pokémon da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão', async () => {
  const { container } = renderWithRouter(<App />);
  userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  const heading = screen.getByRole('heading', { name: /encountered pokémon/i });
  expect(heading).toBeInTheDocument();

  const Name = screen.getByTestId('pokemon-name');
  expect(Name.innerHTML).toBe('Charmander');

  const tipo = screen.getByTestId('pokemon-type');
  expect(tipo.innerHTML).toBe('Fire');

  container.querySelector('#root > div > div > div:nth-child(2) > div');
  const p = screen.getByTestId('pokemon-type');
  expect(p).toBeInTheDocument();
});
test('Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
  const { container } = renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /home/i }));
  container.querySelector('#root > div > div > div:nth-child(3)');
  userEvent.click(screen.getByRole('button', { name: /Electric/i }));
  screen.getByRole('button', { name: /fire/i });
  screen.getByRole('button', { name: /Bug/i });
  screen.getByRole('button', { name: /Poison/i });
  screen.getByRole('button', { name: /Psychic/i });
  screen.getByRole('button', { name: /Normal/i });
  screen.getByRole('button', { name: /Dragon/i });
});
test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App pokemonList={ pokemonList } />);
  const all = screen.getByRole('button', { name: /all/i });
  expect(all).toBeInTheDocument();
  userEvent.click(screen.getByRole('button', { name: /all/i }));
  const Name = screen.getByTestId('pokemon-weight');
  userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
  expect(Name.innerHTML).toBe('Average weight: 8.5 kg');
  userEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
});
