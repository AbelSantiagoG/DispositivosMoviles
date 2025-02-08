import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Inventory = () => {
  return (
    <SafeAreaView>
        <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
            Inventory
        </Text>
    </SafeAreaView>
  )
}

export default Inventory