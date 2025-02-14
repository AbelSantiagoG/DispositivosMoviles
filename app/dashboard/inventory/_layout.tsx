import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

const Inventory = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer >
        <Drawer.Screen
          name="categories"
          options={{
            drawerLabel: 'categories',
            title: 'Categorías'
          }}
        />
        <Drawer.Screen
          name="products"
          options={{
            drawerLabel: 'products',
            title: 'Productos'
          }}
        />
        <Drawer.Screen
          name="suppliers"
          options={{
            drawerLabel: 'suppliers',
            title: 'Proveedores'
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default Inventory