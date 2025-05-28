import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../ProductCard';
import { renderWithContext } from '../../../test-utils/mockContext';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    description: 'Test Description',
    price: 1000,
    stock: 10,
    category_id: '1',
    enterprise_id: '1'
  };

  it('renderiza correctamente con todas las props', () => {
    const { getByText } = renderWithContext(
      <ProductCard
        product={mockProduct}
        onPress={() => {}}
      />
    );
    
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$1.000')).toBeTruthy();
    expect(getByText('Stock: 10')).toBeTruthy();
  });

  it('formatea correctamente el precio', () => {
    const { getByText } = renderWithContext(
      <ProductCard
        product={{ ...mockProduct, price: 1000000 }}
        onPress={() => {}}
      />
    );
    
    expect(getByText('$1.000.000')).toBeTruthy();
  });

  it('formatea correctamente el precio con decimales', () => {
    const { getByText } = renderWithContext(
      <ProductCard
        product={{ ...mockProduct, price: 1000.50 }}
        onPress={() => {}}
      />
    );
    
    expect(getByText('$1.000,50')).toBeTruthy();
  });

  it('maneja el evento onPress correctamente', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <ProductCard
        product={mockProduct}
        onPress={onPressMock}
      />
    );
    
    fireEvent.press(getByTestId('product-card'));
    expect(onPressMock).toHaveBeenCalledWith(mockProduct);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithContext(
      <ProductCard
        product={mockProduct}
        onPress={() => {}}
        style={customStyle}
      />
    );
    
    const card = getByTestId('product-card');
    expect(card.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = renderWithContext(
      <ProductCard
        product={mockProduct}
        onPress={() => {}}
        className="custom-class"
      />
    );
    
    const card = getByTestId('product-card');
    expect(card.props.className).toContain('custom-class');
  });

  it('muestra el stock como agotado cuando es 0', () => {
    const { getByText } = renderWithContext(
      <ProductCard
        product={{ ...mockProduct, stock: 0 }}
        onPress={() => {}}
      />
    );
    
    expect(getByText('Agotado')).toBeTruthy();
  });

  it('muestra el stock como bajo cuando es menor a 5', () => {
    const { getByText } = renderWithContext(
      <ProductCard
        product={{ ...mockProduct, stock: 3 }}
        onPress={() => {}}
      />
    );
    
    expect(getByText('Stock bajo')).toBeTruthy();
  });
}); 