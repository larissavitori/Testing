import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />);
  const more = (screen.getByRole('link', { name: /more details/i }));
  userEvent.click(more);
  expect(more).not.toBeNull();
  const header = screen.getByRole('heading', { name: /pikachu details/i });
  expect(header).toBeInTheDocument();

  const sumary = screen.getByRole('heading', { name: /summary/i });
  expect(sumary).toBeInTheDocument();

  const resumo = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
  expect(resumo).toBeInTheDocument();
});
test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  renderWithRouter(<App />);
  const more = (screen.getByRole('link', { name: /more details/i }));
  userEvent.click(more);

  const location = screen.getByRole('heading', { name: /game locations of pikachu/i });
  expect(location).toBeInTheDocument();

  expect(screen.getByText(/kanto viridian forest/i)).toBeInTheDocument();

  expect(screen.getByText(/kanto power plant/i)).toBeInTheDocument();
  const image = screen.getAllByAltText('Pikachu location');
  expect(image[0].src).toContain('https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
});
test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
  renderWithRouter(<App />);
  const more = (screen.getByRole('link', { name: /more details/i }));
  userEvent.click(more);

  const box = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(box).toBeInTheDocument();
  userEvent.click(box);
  expect(box.checked).toEqual(true);
  userEvent.click(box);
  const image = screen.getAllByAltText('Pikachu location');
  expect(image.src).not.toBeNull();
  const label = screen.getByLabelText(/pokémon favoritado\?/i);
  expect(label).toBeInTheDocument('');
});
