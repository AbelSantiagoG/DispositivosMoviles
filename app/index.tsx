import React from 'react'
import Login from './login'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView className='h-full bg-black'>
      <Login/>
    </SafeAreaView>
  )
}

export default index