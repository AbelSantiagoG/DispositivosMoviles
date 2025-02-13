import { View } from 'react-native'
import React from 'react'
import Login from './login/_layout'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  return (
    <SafeAreaView>
      <Login/>
    </SafeAreaView>
  )
}

export default index