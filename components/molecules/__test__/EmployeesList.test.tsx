import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmployeesList } from '../EmployeesList';
import { DatabaseContext } from '../../../context/DatabaseContext';

// Mock del contexto de la base de datos
const mockDb = {
  query: jest.fn(),
};

const mockDatabaseContext = {
  db: mockDb,
};

describe('EmployeesList', () => {
  const mockEmployees = [
    {
      id: 1,
      name: 'Empleado 1',
      position: 'Cargo 1',
      email: 'empleado1@test.com',
      phone: '1234567890',
      salary: 1000,
      enterprise_id: 1,
    },
    {
      id: 2,
      name: 'Empleado 2',
      position: 'Cargo 2',
      email: 'empleado2@test.com',
      phone: '0987654321',
      salary: 2000,
      enterprise_id: 1,
    },
    {
      id: 3,
      name: 'Empleado 3',
      position: 'Cargo 3',
      email: 'empleado3@test.com',
      phone: '5555555555',
      salary: 3000,
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

  it('renderiza correctamente la lista de empleados', () => {
    const { getByText } = renderWithContext(
      <EmployeesList employees={mockEmployees} onEmployeePress={() => {}} />
    );

    expect(getByText('Empleado 1')).toBeTruthy();
    expect(getByText('Empleado 2')).toBeTruthy();
    expect(getByText('Empleado 3')).toBeTruthy();
  });

  it('maneja el evento onEmployeePress correctamente', () => {
    const onEmployeePressMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <EmployeesList employees={mockEmployees} onEmployeePress={onEmployeePressMock} />
    );

    fireEvent.press(getByTestId('employee-card-1'));
    expect(onEmployeePressMock).toHaveBeenCalledWith(mockEmployees[0]);
  });

  it('renderiza con un estilo personalizado', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = renderWithContext(
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
        style={customStyle}
      />
    );

    const container = getByTestId('employees-list');
    expect(container.props.style).toMatchObject(customStyle);
  });

  it('renderiza con una clase personalizada', () => {
    const { getByTestId } = renderWithContext(
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
        className="custom-list"
      />
    );

    const container = getByTestId('employees-list');
    expect(container.props.className).toContain('custom-list');
  });

  it('renderiza la información del empleado correctamente', () => {
    const { getByText } = renderWithContext(
      <EmployeesList employees={mockEmployees} onEmployeePress={() => {}} />
    );

    expect(getByText('Cargo 1')).toBeTruthy();
    expect(getByText('empleado1@test.com')).toBeTruthy();
    expect(getByText('1234567890')).toBeTruthy();
  });

  it('renderiza el salario correctamente', () => {
    const { getByText } = renderWithContext(
      <EmployeesList employees={mockEmployees} onEmployeePress={() => {}} />
    );

    expect(getByText('$1,000.00')).toBeTruthy();
    expect(getByText('$2,000.00')).toBeTruthy();
    expect(getByText('$3,000.00')).toBeTruthy();
  });

  it('renderiza un mensaje cuando no hay empleados disponibles', () => {
    const { getByText } = renderWithContext(
      <EmployeesList employees={[]} onEmployeePress={() => {}} />
    );

    expect(getByText('No hay empleados disponibles')).toBeTruthy();
  });

  it('renderiza el botón de agregar empleado cuando se proporciona onAddEmployee', () => {
    const onAddEmployeeMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
        onAddEmployee={onAddEmployeeMock}
      />
    );

    const addButton = getByTestId('add-employee-button');
    expect(addButton).toBeTruthy();

    fireEvent.press(addButton);
    expect(onAddEmployeeMock).toHaveBeenCalled();
  });

  it('renderiza el botón de filtrar cuando se proporciona onFilter', () => {
    const onFilterMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
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
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
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
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
        onSearch={onSearchMock}
      />
    );

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeTruthy();

    fireEvent.changeText(searchInput, 'Empleado 1');
    expect(onSearchMock).toHaveBeenCalledWith('Empleado 1');
  });

  it('renderiza el botón de ordenar cuando se proporciona onSort', () => {
    const onSortMock = jest.fn();
    const { getByTestId } = renderWithContext(
      <EmployeesList
        employees={mockEmployees}
        onEmployeePress={() => {}}
        onSort={onSortMock}
      />
    );

    const sortButton = getByTestId('sort-button');
    expect(sortButton).toBeTruthy();

    fireEvent.press(sortButton);
    expect(onSortMock).toHaveBeenCalled();
  });
}); 