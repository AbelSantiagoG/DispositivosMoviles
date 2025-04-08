import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProtectedRoute } from '../../context/ProtectedRoute'
import { PERMISSIONS } from '../../constants/permissions'

const Reports = () => {
  return (
    <ProtectedRoute permissionName={PERMISSIONS.VER_REPORTES}>
        <SafeAreaView>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                Reports
        </Text>
        </SafeAreaView>
    </ProtectedRoute>
  )
}

export default Reports