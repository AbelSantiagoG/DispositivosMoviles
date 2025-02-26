import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

export function DashboardTabBar() {
    return (
        <Tabs screenOptions={{ 
            headerShown: false, 
            tabBarActiveTintColor: "white", 
            tabBarStyle: { 
                backgroundColor: "black", 
                height: 65, 
                borderColor: "black" 
            } 
        }}>
            <Tabs.Screen
                name='dashboard'
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="dashboard" size={22} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='inventory'
                options={{
                    title: 'Inventario',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="warehouse" size={20} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='employees'
                options={{
                    title: 'Empleados',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people" size={26} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='reports'
                options={{
                    title: 'Finanzas',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="money-bill-wave" size={20} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='cashier'
                options={{
                    title: 'POS',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="store" size={20} color={color} />
                    )
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
} 