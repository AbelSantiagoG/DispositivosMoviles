import { Stack } from 'expo-router';
import { CartProvider } from '../../../context/CartContext';

export default function CashierLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="barcode-scanner" />
        <Stack.Screen name="cart-summary" />
        <Stack.Screen name="sale-summary" />
      </Stack>
    </CartProvider>
  );
} 