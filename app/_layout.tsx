import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import NetInfo from '@react-native-community/netinfo'

import "../global.css";

const HomeLayout = () => {
  
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean)
      if (!state.isConnected) {
        router.replace('/no-connection')
      }
    })
    return () => {
      unsubscribe();
    }
  }, [])

  if (!isConnected) {
    return null;
  }

  return (
    
    <Stack>
      <Stack.Screen name = "index" options= {{headerShown: false}}/>
      <Stack.Screen name = "dashboard" options= {{headerShown: false}}/>
      <Stack.Screen name = "login" options= {{headerShown: false}}/>
      <Stack.Screen name = "register" options= {{headerShown: false}}/>
      <Stack.Screen name = "no-connection" options= {{headerShown: false}}/>
    </Stack>
  )
}

export default HomeLayout 
