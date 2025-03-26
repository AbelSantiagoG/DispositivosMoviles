import { ProtectedRoute } from '../../context/ProtectedRoute';
import { EmployeesList } from '../../components/organisms/EmployeesList';
import { ImageSourcePropType } from 'react-native';
import { UserDAO } from '../../interfaces/Auth';

const Employees = () => {
  const mockEmployees: UserDAO[] = [
    {
      id: 1,
      name: 'Empleado 1',
      lastname: 'Apellido 1',
      email: 'empleado1@example.com',
      code: 'EMP001',
      telephone: '123-456-7890',
      enterprise_id: 1,
      is_active: true,
      role: {
        id: 1,
        name: 'Admin',
        description: 'Administrador del sistema',
        permissions: [],
      },
      enterprise: {
        id: 1,
        name: 'Empresa 1',
        NIT: '123456789',
      },
    },
    {
      id: 2,
      name: 'Empleado 2',
      lastname: 'Apellido 2',
      email: 'empleado2@example.com',
      code: 'EMP002',
      telephone: '987-654-3210',
      enterprise_id: 1,
      is_active: true,
      role: {
        id: 2,
        name: 'Empleado',
        description: 'Empleado regular',
        permissions: [],
      },
      enterprise: {
        id: 1,
        name: 'Empresa 1',
        NIT: '123456789',
      },
    },
    {
      id: 3,
      name: 'Empleado 3',
      lastname: 'Apellido 3',
      email: 'empleado3@example.com',
      code: 'EMP003',
      telephone: '555-555-5555',
      enterprise_id: 1,
      is_active: true,
      role: {
        id: 2,
        name: 'Empleado',
        description: 'Empleado regular',
        permissions: [],
      },
      enterprise: {
        id: 1,
        name: 'Empresa 1',
        NIT: '123456789',
      },
    },
    {
      id: 4,
      name: 'Empleado 4',
      lastname: 'Apellido 4',
      email: 'empleado4@example.com',
      code: 'EMP004',
      telephone: '111-222-3333',
      enterprise_id: 1,
      is_active: true,
      role: {
        id: 2,
        name: 'Empleado',
        description: 'Empleado regular',
        permissions: [],
      },
      enterprise: {
        id: 1,
        name: 'Empresa 1',
        NIT: '123456789',
      },
    },
    {
      id: 5,
      name: 'Empleado 5',
      lastname: 'Apellido 5',
      email: 'empleado5@example.com',
      code: 'EMP005',
      telephone: '444-444-4444',
      enterprise_id: 1,
      is_active: true,
      role: {
        id: 2,
        name: 'Empleado',
        description: 'Empleado regular',
        permissions: [],
      },
      enterprise: {
        id: 1,
        name: 'Empresa 1',
        NIT: '123456789',
      },
    },
  ];

  return (
    <ProtectedRoute permissionName="GESTIONAR_EMPLEADOS">
      <EmployeesList employees={mockEmployees} />
    </ProtectedRoute>
  );
};

export default Employees;