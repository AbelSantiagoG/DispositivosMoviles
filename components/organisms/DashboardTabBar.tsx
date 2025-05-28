import { Tabs } from 'expo-router';
import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { useMemo } from 'react';
import { hasPermission } from '../../utils/permissionsUtils';
import { PERMISSIONS } from '../../constants/permissions';

export function DashboardTabBar() {
    const { user } = useAuth();
    
    // Calcular los permisos una sola vez
    const permissions = useMemo(() => {
        return {
            inventory: hasPermission(user, PERMISSIONS.GESTIONAR_INVENTARIO),
            employees: hasPermission(user, PERMISSIONS.GESTIONAR_EMPLEADOS),
            reports: hasPermission(user, PERMISSIONS.VER_REPORTES),
            cashier: hasPermission(user, PERMISSIONS.GESTIONAR_VENTAS)
        };
    }, [user]);
    
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
                    ),
                    href: permissions.inventory ? undefined : null
                }}
            />
            
            <Tabs.Screen
                name='employees'
                options={{
                    title: 'Empleados',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="people" size={26} color={color} />
                    ),
                    href: permissions.employees ? undefined : null
                }}
            />
            
            <Tabs.Screen
                name='reports'
                options={{
                    title: 'Finanzas',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="money-bill-wave" size={20} color={color} />
                    ),
                    href: permissions.reports ? undefined : null
                }}
            />
            
            <Tabs.Screen
                name='cashier'
                options={{
                    title: 'POS',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="store" size={20} color={color} />
                    ),
                    href: permissions.cashier ? undefined : null
                }}
            />
            
            <Tabs.Screen
                name='profile'
                options={{
                    href: null,
                }}
            />
            <Tabs.Screen
                name='employeeDetails/[idEmployee]'
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name='notifications'
                options={{
                    tabBarIcon:({color}) =>(
                        <AntDesign name="notification" size={20} color={color} />
                    ),
                    href: null
                }
                }
            />
        </Tabs>
    );
} 