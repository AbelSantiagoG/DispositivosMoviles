import React from 'react';
import { render } from '@testing-library/react-native';
import { EmployeesList } from '../EmployeesList';

// Mock de los componentes hijos
jest.mock('../../molecules/EmployeesCard', () => ({
  EmployeesCard: (props) => <div data-testid="employee-card">Empleado</div>,
}));
jest.mock('../../molecules/AddEmployeesModal', () => ({
  AddEmployeesModal: (props) => <div data-testid="add-employee-modal">Modal</div>,
}));

describe('EmployeesList', () => {
  const mockEmployees = [
    { id: 1, name: 'Empleado 1' },
    { id: 2, name: 'Empleado 2' },
  ];
  const mockListEmployees = jest.fn();

  it('renderiza la lista de empleados', () => {
    const { getAllByTestId } = render(
      <EmployeesList employees={mockEmployees} listEmployees={mockListEmployees} />
    );
    expect(getAllByTestId('employee-card').length).toBe(2);
  });

  it('renderiza el modal de agregar empleado', () => {
    const { getByTestId } = render(
      <EmployeesList employees={mockEmployees} listEmployees={mockListEmployees} />
    );
    expect(getByTestId('add-employee-modal')).toBeTruthy();
  });
}); 