import { View, Text } from 'react-native'
import { Link, Slot, Stack} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'


const Dashboard = () => {
    return (
        <SafeAreaView className='h-full flex flex-col items-center justify-center gap-10 '>
            <Stack></Stack>
            <Link href='/dashboard/cashier'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Cashier
                </Text>
            </Link>
            <Link href='/dashboard/employees'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Employees
                </Text>
            </Link>
            <Link href='/dashboard/inventory'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Inventory
                </Text>
            </Link>
            <Link href='/dashboard/profile'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Profile
                </Text>
            </Link>
            <Link href='/dashboard/reports'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Reports
                </Text>
            </Link>
        </SafeAreaView>
    )
}

export default Dashboard