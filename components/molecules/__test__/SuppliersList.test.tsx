import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SuppliersList } from '../SuppliersList';
import { DatabaseContext } from '../../../context/DatabaseContext';

// Mock del contexto de la base de datos
const mockDb = {
  query: jest.fn(),
};

const mockDatabaseContext = {
  db: mockDb,
};

describe('SuppliersList', () => {
  const mockSuppliers = [
    {
      id: 1,
      name: 'Proveedor 1',
      contact: 'Contacto 1',
      phone: '1234567890',
      email: 'proveedor1@test.com',
      address: 'Dirección 1',
      enterprise_id: 1,
    },
    {
      id: 2,
      name: 'Proveedor 2',
      contact: 'Contacto 2',
      phone: '0987654321',
      email: 'proveedor2@test.com',
      address: 'Dirección 2',
      enterprise_id: 1,
    },
    {
      id: 3,
      name: 'Proveedor 3',
      contact: 'Contacto 3',
      phone: '5555555555',
      email: 'proveedor3@test.com',
      address: 'Dirección 3',
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

  it('renderiza correctamente la lista de proveedores', () => {
    const { getByText } = renderWithContext(
      <SuppliersList suppliers={mockSuppliers} onSupplierPress={() => {}} />
    );

    expect(getByText('Proveedor 1')).toBeTruthy();
    expect(getByText('Proveedor 2')).toBeTruthy();
    expect(getByText('Proveedor 3')).toBeTruthy();
  });

  it('maneja el evento onSupplierPress correctamente', () => {
    const onSupplierPressMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <SuppliersList suppliers={mockSuppliers} onSupplierPress={onSupplierPressMock} />
    );

    fireEvent.press(getByTestId('supplier-card-1'));
    expect(onSupplierPressMock).toHaveBeenCalledWith(mockSuppliers[0]);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        style={customStyle}
      />
    );

    const container = getByTestId('suppliers-list');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        className="custom-list"
      />
    );

    const container = getByTestId('suppliers-list');
    expect(container.props.className).toContain('custom-list');
  });

  it('renderiza la información de contacto correctamente', () => {
    const { getByText } = renderWithContext(
      <SuppliersList suppliers={mockSuppliers} onSupplierPress={() => {}} />
    );

    expect(getByText('Contacto 1')).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
    expect(getByText('proveedor1@test.com')).toBeTruthy();
  });

  it('renderiza un mensaje cuando no hay proveedores disponibles', () => {
    const { getByText } = renderWithContext(
      <SuppliersList suppliers={[]} onSupplierPress={() => {}} />
    );

    expect(getByText('No hay proveedores disponibles')).toBeTruthy();
  });

  it('renderiza el botón de agregar proveedor cuando se proporciona onAddSupplier', () => {
    const onAddSupplierMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        onAddSupplier={onAddSupplierMock}
      />
    );

    const addButton = getByTestId('add-supplier-button');
    expect(addButton).toBeTruthy();

    fireEvent.press(addButton);
    expect(onAddSupplierMock).toHaveBeenCalled();
  });

  it('renderiza el botón de filtrar cuando se proporciona onFilter', () => {
    const onFilterMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        onFilter={onFilterMock}
      />
    );

    const filterButton = getByTestId('filter-button');
    expect(filterButton).toBeTruthy();

    fireEvent.press(filterButton);
    expect(onFilterMock).toHaveBeenCalled();
  });

  it('renderiza el botón de búsqueda cuando se proporciona onSearch', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        onSearch={onSearchMock}
      />
    );

    const searchButton = getByTestId('search-button');
    expect(searchButton).toBeTruthy();

    fireEvent.press(searchButton);
    expect(onSearchMock).toHaveBeenCalled();
  });

  it('renderiza el input de búsqueda cuando se proporciona onSearch', () => {
    const onSearchMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <SuppliersList
        suppliers={mockSuppliers}
        onSupplierPress={() => {}}
        onSearch={onSearchMock}
      />
    );

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeTruthy();

    fireEvent.changeText(searchInput, 'Proveedor 1');
    expect(onSearchMock).toHaveBeenCalledWith('Proveedor 1');
  });
}); 