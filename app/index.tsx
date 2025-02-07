import { View, Text } from 'react-native'
import React from 'react'

import { Link } from 'expo-router'

const index = () => {
  return (
    <View>
      <Text className='text-4xl text-red-600'>index</Text>
      <Link href='/profile' className='text-red-800'>Pepe</Link>
    </View>
  )
}

export default index