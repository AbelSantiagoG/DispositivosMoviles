import React, { useEffect } from 'react'
import Login from './login'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from '../context/AuthContext';
//El código de aquí es el que se hace dependiendo del componente
import * as schema from '../db/addDummyData';
import { useSQLiteContext } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';

const index = () => {
  const dbCall = useSQLiteContext();
  const drizzleDB = drizzle(dbCall, { schema })

  useEffect(() => {
    const load = async () => {
      const data = await drizzleDB.query.tasks.findMany();
      console.log('Data', data);
      
    }
    load()
  }, [])
  //PAPA
  return (

    <SafeAreaView className='h-full bg-black'>
      <Login />
    </SafeAreaView>

  )
}

export default index