import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Employees = () => {
  return (
    <SafeAreaView>
        <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
            Employees
        </Text>
    </SafeAreaView>
  )
}

export default Employees