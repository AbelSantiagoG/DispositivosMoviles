import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductList } from '../ProductList';

describe('ProductList', () => {
  const mockProducts = [
    { id: 1, name: 'Producto 1' },
    { id: 2, name: 'Producto 2' },
  ];
  it('renderiza la lista de productos', () => {
    const { getByText } = render(
      <ProductList products={mockProducts} />
    );
    expect(getByText('Producto 1')).toBeTruthy();
    expect(getByText('Producto 2')).toBeTruthy();
  });
}); 