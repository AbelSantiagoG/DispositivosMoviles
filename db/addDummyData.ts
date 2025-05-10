import { lists, tasks } from "./schema";
import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

import AsyncStorage from "expo-sqlite/kv-store";

export const addDummyData = async(db: ExpoSQLiteDatabase ) =>{
    const value = AsyncStorage.getItemSync('dbInitialized')
    if (value) return
    
    console.log('Inserting list');

    //Estos datos deben ser de la base de datos, si tengo conexión a mi 
    //db hago un fetch de los registros de mi base de datos y actualizo los registros si no pues dejo la información que tengo y 
    //cuando tenga nuevamente internet actualizo mis datos 
    await db.insert(lists).values([
        {name: "List 1"},
        {name: "List 2"},
        {name: "List 3"},
    ])
    
    await db.insert(tasks).values([
        {name: "Task 1", list_id: 1},
        {name: "Task 2", list_id: 1},
        {name: "Task 3", list_id: 1},
    ])

    await db.insert(tasks).values([
        {name: "Task 1", list_id: 2},
        {name: "Task 2", list_id: 2},
        {name: "Task 3", list_id: 2},
    ])

    await db.insert(tasks).values([
        {name: "Task 1", list_id: 3},
        {name: "Task 2", list_id: 3},
        {name: "Task 3", list_id: 3},
    ])

    AsyncStorage.setItemAsync('dbInitialized', 'true')
}