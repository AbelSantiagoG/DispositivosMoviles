import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Cashier = () => {
  return (
    <SafeAreaView className='h-full flex flex-col items-center justify-center gap-10 ' >
        <Text className='bg-slate-200 text-3xl p-5 rounded-lg '>
            Cashier
        </Text>
    </SafeAreaView>
  )
}

export default Cashier