import { View, Text } from 'react-native'
import { Link, Slot, Stack} from 'expo-router'


const Dashboard = () => {
    return (
        <View className='h-full flex flex-col items-center justify-center gap-10'>
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
            <Link href='/inventory'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Inventory
                </Text>
            </Link>
            <Link href='/profile'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Profile
                </Text>
            </Link>
            <Link href='/reports'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Reports
                </Text>
            </Link>
        </View>
    )
}

export default Dashboard