import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductList } from '../ProductList';
import { DatabaseContext } from '../../../context/DatabaseContext';

// Mock del contexto de la base de datos
const mockDb = {
  query: jest.fn(),
};

const mockDatabaseContext = {
  db: mockDb,
};

// Mock del servicio de productos
jest.mock('../../../lib/products', () => ({
  useProductService: () => ({
    getProductImage: jest.fn().mockResolvedValue('mock-image-url'),
  }),
}));

describe('ProductList', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripción 1',
      price: 100,
      stock: 10,
      category_id: 1,
      enterprise_id: 1,
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Descripción 2',
      price: 200,
      stock: 5,
      category_id: 1,
      enterprise_id: 1,
    },
    {
      id: 3,
      name: 'Producto 3',
      description: 'Descripción 3',
      price: 300,
      stock: 0,
      category_id: 1,
      enterprise_id: 1,
    },
  ];

  const renderWithContext = (component: React.ReactNode) => {
    return render(
      <DatabaseContext.Provider value={mockDatabaseContext}>
        {component}
      </DatabaseContext.Provider>
    );
  };

  it('renderiza correctamente la lista de productos', () => {
    const { getByText } = renderWithContext(
      <ProductList products={mockProducts} onProductPress={() => {}} />
    );

    expect(getByText('Producto 1')).toBeTruthy();
    expect(getByText('Producto 2')).toBeTruthy();
    expect(getByText('Producto 3')).toBeTruthy();
  });

  it('maneja el evento onProductPress correctamente', () => {
    const onProductPressMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <ProductList products={mockProducts} onProductPress={onProductPressMock} />
    );

    fireEvent.press(getByTestId('product-card-1'));
    expect(onProductPressMock).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithContext(
      <ProductList
        products={mockProducts}
        onProductPress={() => {}}
        style={customStyle}
      />
    );

    const container = getByTestId('product-list');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = renderWithContext(
      <ProductList
        products={mockProducts}
        onProductPress={() => {}}
        className="custom-list"
      />
    );

    const container = getByTestId('product-list');
    expect(container.props.className).toContain('custom-list');
  });

  it('renderiza los productos agotados correctamente', () => {
    const { getByText } = renderWithContext(
      <ProductList products={mockProducts} onProductPress={() => {}} />
    );

    expect(getByText('Agotado')).toBeTruthy();
  });

  it('renderiza los productos con stock bajo correctamente', () => {
    const { getByText } = renderWithContext(
      <ProductList products={mockProducts} onProductPress={() => {}} />
    );

    expect(getByText('Stock bajo')).toBeTruthy();
  });

  it('renderiza los precios correctamente', () => {
    const { getByText } = renderWithContext(
      <ProductList products={mockProducts} onProductPress={() => {}} />
    );

    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('$200.00')).toBeTruthy();
    expect(getByText('$300.00')).toBeTruthy();
  });

  it('renderiza un mensaje cuando no hay productos disponibles', () => {
    const { getByText } = renderWithContext(
      <ProductList products={[]} onProductPress={() => {}} />
    );

    expect(getByText('No hay productos disponibles')).toBeTruthy();
  });

  it('renderiza el botón de agregar producto cuando se proporciona onAddProduct', () => {
    const onAddProductMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <ProductList
        products={mockProducts}
        onProductPress={() => {}}
        onAddProduct={onAddProductMock}
      />
    );

    const addButton = getByTestId('add-product-button');
    expect(addButton).toBeTruthy();

    fireEvent.press(addButton);
    expect(onAddProductMock).toHaveBeenCalled();
  });

  it('renderiza el botón de filtrar cuando se proporciona onFilter', () => {
    const onFilterMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <ProductList
        products={mockProducts}
        onProductPress={() => {}}
        onFilter={onFilterMock}
      />
    );

    const filterButton = getByTestId('filter-button');
    expect(filterButton).toBeTruthy();

    fireEvent.press(filterButton);
    expect(onFilterMock).toHaveBeenCalled();
  });
}); 