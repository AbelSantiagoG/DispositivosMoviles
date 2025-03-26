import { ProtectedRoute } from '../../context/ProtectedRoute'
import { EmployeesList } from '../../components/organisms/EmployeesList'
const Employees = () => {
  const mockEmployees = [
    { id: '1', name: 'Empleado 1' },
    { id: '2', name: 'Empleado 2' },
    { id: '3', name: 'Empleado 3' },
    { id: '4', name: 'Empleado 4' },
    { id: '5', name: 'Empleado 5' }
  ]
  return (
    <ProtectedRoute permissionName='GESTIONAR_EMPLEADOS'>
      <EmployeesList
        employees={mockEmployees}
      />
    </ProtectedRoute>
  )
}

export default Employees