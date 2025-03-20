import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ProtectedRoute } from '../../context/ProtectedRoute'

const Cashier = () => {
  return (
    <ProtectedRoute permissionName='GESTIONAR_VENTAS'>
      <SafeAreaView className='h-full flex flex-col items-center justify-center gap-10 ' >
        <Text className='bg-slate-200 text-3xl p-5 rounded-lg '>
          Cashier
        </Text>
      </SafeAreaView>
    </ProtectedRoute>
  )
}

export default Cashier