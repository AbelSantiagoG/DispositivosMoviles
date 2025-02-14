import { Tabs} from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context'

import "../../global.css";

const DashboardLayout = () => {
    return (
        <Tabs screenOptions= {{headerShown: false}}>
            <Tabs.Screen 
                name='cashier'
                options={{
                title: 'Cajero',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen 
                name='employees'
                options={{
                title: 'Empleados',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen 
                name='profile'
                options={{
                title: 'Perfil',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                )
                }}
            />
            <Tabs.Screen 
                name='reports'
                options={{
                title: 'Reportes',
                tabBarIcon: ({ color }) => (
                    <AntDesign name="home" size={24} color={color} />
                )
                }}
            />
        </Tabs>
    )
}

export default DashboardLayout 
