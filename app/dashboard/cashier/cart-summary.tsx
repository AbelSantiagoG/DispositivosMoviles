import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '../../../context/CartContext';

const CartSummaryScreen = () => {
  // Usar el contexto del carrito
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalAmount } = useCart();

  const totalAmount = getTotalAmount();

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      updateQuantity(id, newQuantity);
    }
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-4">
        {/* Items del carrito */}
        <ScrollView className="flex-1 mb-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item.id} className="bg-gray-800 p-4 rounded-lg mb-3 border border-gray-700">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-white font-semibold text-lg flex-1">{item.name}</Text>
                  <TouchableOpacity 
                    onPress={() => removeFromCart(item.id)}
                    className="ml-2 p-1"
                  >
                    <FontAwesome5 name="trash" size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-400 text-sm mb-3">{item.category}</Text>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      onPress={() => handleUpdateQuantity(item.id, -1)}
                      className="bg-red-600 w-10 h-10 rounded items-center justify-center"
                    >
                      <FontAwesome5 name="minus" size={14} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white mx-4 font-bold text-lg">{item.quantity}</Text>
                    <TouchableOpacity 
                      onPress={() => handleUpdateQuantity(item.id, 1)}
                      className="bg-green-600 w-10 h-10 rounded items-center justify-center"
                    >
                      <FontAwesome5 name="plus" size={14} color="white" />
                    </TouchableOpacity>
                  </View>
                  <View className="items-end">
                    <Text className="text-gray-400 text-sm">${item.public_price.toFixed(2)} c/u</Text>
                    <Text className="text-green-400 font-bold text-lg">
                      ${(item.public_price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="flex-1 items-center justify-center">
              <FontAwesome5 name="shopping-cart" size={60} color="#6B7280" />
              <Text className="text-gray-400 text-lg mt-4">El carrito está vacío</Text>
              <TouchableOpacity 
                onPress={() => router.back()}
                className="bg-blue-600 px-6 py-3 rounded-lg mt-4"
              >
                <Text className="text-white font-semibold">Agregar Productos</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {cartItems.length > 0 && (
          <>
            {/* Resumen de totales */}
            <View className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700">
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">Subtotal:</Text>
                <Text className="text-white font-semibold">${totalAmount.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400">IVA (12%):</Text>
                <Text className="text-white font-semibold">${(totalAmount * 0.12).toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between border-t border-gray-700 pt-2">
                <Text className="text-white font-bold text-xl">Total:</Text>
                <Text className="text-green-400 font-bold text-xl">
                  ${(totalAmount * 1.12).toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Botones de acción */}
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => router.back()}
                className="bg-blue-600 p-2 rounded-lg flex-1 flex-row items-center justify-center"
              >
                <FontAwesome5 name="plus" size={14} color="white" style={{ marginRight: 6 }} />
                <Text className="text-white font-semibold text-sm">Agregar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/dashboard/cashier/sale-summary')}
                className="bg-green-600 p-2 rounded-lg flex-1 flex-row items-center justify-center"
              >
                <FontAwesome5 name="credit-card" size={14} color="white" style={{ marginRight: 6 }} />
                <Text className="text-white font-bold text-sm">Procesar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleClearCart}
                className="bg-red-600 p-2 rounded-lg flex-1 flex-row items-center justify-center"
              >
                <FontAwesome5 name="trash" size={14} color="white" style={{ marginRight: 6 }} />
                <Text className="text-white font-semibold text-sm">Limpiar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartSummaryScreen; 