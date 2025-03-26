import { useEffect, useState } from 'react';
import { ProtectedRoute } from '../../context/ProtectedRoute';
import { EmployeesList } from '../../components/organisms/EmployeesList';
import { employeeService } from '../../lib/employees';
import { EmployeeData } from '../../lib/employees';
import { Text } from 'react-native';

const Employees = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]); 
  const [loading, setLoading] = useState(true); 

  const listEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    listEmployees();
  }, []);

  return (
    <ProtectedRoute permissionName="GESTIONAR_EMPLEADOS">
      {loading ? (
        <Text className="text-white text-center mt-10">Cargando empleados...</Text>
      ) : (
        <EmployeesList employees={employees} listEmployees={listEmployees} />
      )}
    </ProtectedRoute>
  );
};

export default Employees;