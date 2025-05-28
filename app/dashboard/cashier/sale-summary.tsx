import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useCart } from '../../../context/CartContext';
import { createInvoice, CreateInvoiceRequest } from '../../../lib/invoices';

const SaleSummaryScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'credit_card' | 'debit_card'>('cash');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sendElectronicInvoice, setSendElectronicInvoice] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Usar el contexto del carrito
  const { cartItems, getTotalAmount, clearCart } = useCart();

  const subtotal = getTotalAmount();
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: 'money-bill-wave', color: 'bg-green-600' },
    { id: 'debit_card', name: 'Tarjeta Débito', icon: 'credit-card', color: 'bg-blue-600' },
    { id: 'credit_card', name: 'Tarjeta Crédito', icon: 'credit-card', color: 'bg-purple-600' },
  ];

  const processSale = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrito Vacío', 'No hay productos en el carrito para procesar.');
      return;
    }

    if (sendElectronicInvoice && (!customerName.trim() || !customerEmail.trim())) {
      Alert.alert('Datos Incompletos', 'Para la factura electrónica necesitas completar el nombre y email del cliente.');
      return;
    }

    setIsProcessing(true);

    try {
      // Preparar los datos para el endpoint
      const invoiceData: CreateInvoiceRequest = {
        payment_method: paymentMethod,
        sales: cartItems.map(item => ({
          quantity: item.quantity,
          product_id: parseInt(item.id)
        }))
      };

      // Llamar al endpoint para crear la factura
      const invoiceResponse = await createInvoice(invoiceData);

      // Mostrar confirmación de éxito
      Alert.alert(
        'Venta Procesada',
        `Venta completada exitosamente\nFactura #${invoiceResponse.id}\nTotal: $${total.toFixed(2)}\nMétodo: ${paymentMethods.find(p => p.id === paymentMethod)?.name}${sendElectronicInvoice ? '\nFactura electrónica enviada' : ''}`,
        [
          { 
            text: 'Nueva Venta', 
            onPress: () => {
              clearCart();
              router.replace('/dashboard/cashier');
            }
          },
          { text: 'Ver Recibo', onPress: () => { } }
        ]
      );
    } catch (error) {
      console.error('Error processing sale:', error);
      Alert.alert(
        'Error al Procesar Venta',
        'Hubo un problema al procesar la venta. Por favor, intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Si no hay productos en el carrito, mostrar mensaje
  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 items-center justify-center p-4">
          <FontAwesome5 name="shopping-cart" size={80} color="#6B7280" />
          <Text className="text-white text-xl font-bold mt-6 mb-2">No hay productos para procesar</Text>
          <Text className="text-gray-400 text-center mb-8">
            Agrega productos al carrito antes de procesar una venta
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-blue-600 px-8 py-4 rounded-lg"
          >
            <Text className="text-white font-semibold text-lg">Agregar Productos</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Items de la venta */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">
            Productos ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
          </Text>
          {cartItems.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center py-2 border-b border-gray-700">
              <View className="flex-1">
                <Text className="text-white font-medium">{item.name}</Text>
                <Text className="text-gray-400 text-sm">{item.category}</Text>
              </View>
              <View className="items-end">
                <Text className="text-white">{item.quantity} x ${item.public_price.toFixed(2)}</Text>
                <Text className="text-green-400 font-semibold">
                  ${(item.public_price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          
          {/* Totales */}
          <View className="mt-4 pt-4 border-t border-gray-700">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">Subtotal:</Text>
              <Text className="text-white">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-400">IVA (12%):</Text>
              <Text className="text-white">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between border-t border-gray-700 pt-2">
              <Text className="text-white font-bold text-lg">Total:</Text>
              <Text className="text-green-400 font-bold text-lg">${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Método de pago */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-4">Método de Pago</Text>
          <View className="flex-row justify-between">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => setPaymentMethod(method.id as any)}
                className={`flex-1 mx-1 p-4 rounded-lg items-center ${paymentMethod === method.id ? method.color : 'bg-gray-700'
                  }`}
              >
                <FontAwesome5 
                  name={method.icon as any} 
                  size={24} 
                  color="white" 
                  style={{ marginBottom: 8 }} 
                />
                <Text className="text-white text-sm font-medium">{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Facturación electrónica */}
        <View className="bg-gray-800 rounded-lg p-4 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-lg font-semibold">Factura Electrónica</Text>
            <TouchableOpacity
              onPress={() => setSendElectronicInvoice(!sendElectronicInvoice)}
              className={`w-12 h-6 rounded-full ${sendElectronicInvoice ? 'bg-green-600' : 'bg-gray-600'}`}
            >
              <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${sendElectronicInvoice ? 'ml-6' : 'ml-0.5'}`} />
            </TouchableOpacity>
          </View>

          {sendElectronicInvoice && (
            <View className="space-y-3">
              <View>
                <Text className="text-gray-400 mb-2">Nombre del Cliente *</Text>
                <TextInput
                  className="bg-gray-700 text-white p-3 rounded-lg"
                  placeholder="Ingresa el nombre..."
                  placeholderTextColor="#9CA3AF"
                  value={customerName}
                  onChangeText={setCustomerName}
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Email *</Text>
                <TextInput
                  className="bg-gray-700 text-white p-3 rounded-lg"
                  placeholder="cliente@email.com"
                  placeholderTextColor="#9CA3AF"
                  value={customerEmail}
                  onChangeText={setCustomerEmail}
                  keyboardType="email-address"
                />
              </View>
              
              <View>
                <Text className="text-gray-400 mb-2">Teléfono (Opcional)</Text>
                <TextInput
                  className="bg-gray-700 text-white p-3 rounded-lg"
                  placeholder="+593 99 999 9999"
                  placeholderTextColor="#9CA3AF"
                  value={customerPhone}
                  onChangeText={setCustomerPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          )}
        </View>

        {/* Botones de acción */}
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-gray-600 p-3 rounded-lg flex-1 flex-row items-center justify-center"
          >
            <FontAwesome5 name="edit" size={14} color="white" style={{ marginRight: 6 }} />
            <Text className="text-white font-semibold text-sm">Modificar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={processSale}
            disabled={isProcessing}
            className={`p-3 rounded-lg flex-2 flex-row items-center justify-center ${isProcessing ? 'bg-gray-600' : 'bg-green-600'}`}
            style={{ flex: 2 }}
          >
            <FontAwesome5 
              name={isProcessing ? "spinner" : "check-circle"} 
              size={14} 
              color="white" 
              style={{ marginRight: 6 }} 
            />
            <Text className="text-white font-bold text-sm">
              {isProcessing ? 'Procesando...' : 'Procesar Venta'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaleSummaryScreen; 