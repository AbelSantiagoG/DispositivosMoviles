import React from 'react';
import { render } from '@testing-library/react-native';
import { SuppliersList } from '../SuppliersList';

jest.mock('../../molecules/SuppliersCard', () => ({
  SuppliersCard: (props) => <div data-testid="supplier-card">Proveedor</div>,
}));
jest.mock('../../molecules/AddSuppliersModal', () => ({
  AddSuppliersModal: (props) => <div data-testid="add-supplier-modal">Modal</div>,
}));

describe('SuppliersList', () => {
  const mockSuppliers = [
    { id: 1, name: 'Proveedor 1' },
    { id: 2, name: 'Proveedor 2' },
  ];
  const mockListSuppliers = jest.fn();

  it('renderiza la lista de proveedores', () => {
    const { getAllByTestId } = render(
      <SuppliersList suppliers={mockSuppliers} listSuppliers={mockListSuppliers} />
    );
    expect(getAllByTestId('supplier-card').length).toBe(2);
  });

  it('renderiza el modal de agregar proveedor', () => {
    const { getByTestId } = render(
      <SuppliersList suppliers={mockSuppliers} listSuppliers={mockListSuppliers} />
    );
    expect(getByTestId('add-supplier-modal')).toBeTruthy();
  });
}); 