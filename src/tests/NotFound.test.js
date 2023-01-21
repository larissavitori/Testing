import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../pages/NotFound';

test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const not = screen.getByText(/Page requested not found/i);
  expect(not).toBeInTheDocument();
});
test('Teste se a página mostra a imagem ', () => {
  renderWithRouter(<NotFound />);
  const image = screen.getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
