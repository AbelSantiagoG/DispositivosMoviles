import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Image } from 'react-native'

import "../../global.css";

const DashboardLayout = () => {
    return (
        <SafeAreaView className='flex-1 bg-black'>
            <View className="flex-row justify-between items-center p-4">
                <Image source={require('../../assets/logo.png')} className='w-20 h-20 mr-auto' resizeMode="contain" />
                <AntDesign name="user" size={24} color="white" />
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
                        name='employees'
                        options={{
                            title: 'Empleados',
                            tabBarIcon: ({ color }) => (
                                <AntDesign name="user" size={22} color={color} />
                            )
                        }}
                    />
                    <Tabs.Screen
                        name='profile'
                        options={{
                            title: 'Perfil',
                            tabBarIcon: ({ color }) => (
                                <AntDesign name="profile" size={22} color={color} />
                            )
                        }}
                    />
                    <Tabs.Screen
                        name='reports'
                        options={{
                            title: 'Reportes',
                            tabBarIcon: ({ color }) => (
                                <AntDesign name="barschart" size={22} color={color} />
                            )
                        }}
                    />
                </Tabs>
            </View>
        </SafeAreaView>
    )
}

export default DashboardLayout;
