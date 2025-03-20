import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProtectedRoute } from '../../context/ProtectedRoute'
const Employees = () => {
  return (
    <ProtectedRoute permissionName='GESTIONAR_EMPLEADOS'>
        <SafeAreaView>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                Employees
            </Text>
        </SafeAreaView>
    </ProtectedRoute>
  )
}

export default Employees