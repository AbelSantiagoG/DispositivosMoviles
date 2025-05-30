import { useEffect, useState } from 'react';
import { ProtectedRoute } from '../../context/ProtectedRoute';
import { EmployeesList } from '../../components/organisms/EmployeesList';
import { employeeService } from '../../lib/employees';
import { EmployeeData } from '../../lib/employees';
import { Text } from 'react-native';
import { PERMISSIONS } from '../../constants/permissions';

const Employees = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const listEmployees = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      setError('No se pudieron cargar los empleados');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    listEmployees();
  }, []);

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_EMPLEADOS}>
      {loading ? (
        <Text className="text-white text-center mt-10">Cargando empleados...</Text>
      ) : error ? (
        <Text className="text-red-500 text-center mt-10">{error}</Text>
      ) : (
        <EmployeesList employees={employees} listEmployees={listEmployees} />
      )}
    </ProtectedRoute>
  );
};

export default Employees;