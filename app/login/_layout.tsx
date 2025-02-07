import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { Link } from 'expo-router'

const Login = () => {
  return (
        <View className='flex flex-col'>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Este es el login, vámonos pal dashboard
            </Text>
            <Link href='/dashboard'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Dashboard
                </Text>
            </Link>
            <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    ¿No tiene cuenta pa?
            </Text>
            <Link href='/register'>
                <Text className='bg-slate-200 text-3xl p-5 rounded-lg'>
                    Regístrese
                </Text>
            </Link>
        </View>
  )
}

export default Login