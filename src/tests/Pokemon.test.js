import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  renderWithRouter(<App />);
  const h2 = screen.getByRole('heading', { name: /encountered pokémon/i });
  expect(h2).toBeInTheDocument();

  const name = screen.getByText(/Pikachu/i);
  expect(name).toBeInTheDocument();
});
test('O tipo correto do Pokémon deve ser mostrado na tela', () => {
  renderWithRouter(<App />);

  const type = screen.getByTestId('pokemon-type');
  expect(type).toBeInTheDocument();
  expect(type).toHaveTextContent(/Electric/i);

  const peso = screen.getByText(/average weight: 6\.0 kg/i);
  expect(peso).toBeInTheDocument();
});
test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByText(/home/i));
  const image = screen.getByAltText('Pikachu sprite');
  expect(image.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
});
test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
  const detalis = screen.getByRole('heading', { name: /pikachu details/i });
  expect(detalis).toBeInTheDocument();
});
test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  const { history } = renderWithRouter(<App />);
  const poke = '/Pokemon/25';
  act(() => {
    history.push(poke);
  });
  const sumary = screen.getByRole('heading', { name: /summary/i });
  expect(sumary).toBeInTheDocument();

  const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(check).toBeInTheDocument();
  userEvent.click(check);
  const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toBe('http://localhost/star-icon.svg');
});
/* / test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  renderWithRouter(<App />);
  userEvent.click(screen.getByRole('link', { name: /more details/i }));
  const det = screen.getByRole('heading', { name: /pikachu details/i });
  expect(det).toBeInTheDocument();
  const check = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  userEvent.click(check);
  expect(check).toBeInTheDocument();
  const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('/star-icon.svg');
 }); / */
