import { Tabs, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image, TouchableOpacity } from 'react-native'

import "../../global.css";

const DashboardLayout = () => {
    return (
        <SafeAreaView className='flex-1 bg-black'>
            <View className="flex-row justify-between items-center p-4">
                <Image source={require('../../assets/logo.png')} className='w-20 h-20 mr-auto' resizeMode="contain" />
                <TouchableOpacity onPress={() => router.push('/dashboard/profile')}>
                    <AntDesign name="user" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View className='flex-1 bg-black'>
                <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: "white",tabBarStyle: {  backgroundColor: "black", height: 65  }}}>
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
            </View>
        </SafeAreaView>
    )
}

export default DashboardLayout;
