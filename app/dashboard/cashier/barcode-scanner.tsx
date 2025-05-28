import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

const BarcodeScannerScreen = () => {
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const mockProduct = {
    id: '7891234567890',
    name: 'Coca Cola 500ml',
    price: 2.50,
    category: 'Bebidas',
    stock: 25,
    description: 'Bebida gaseosa sabor cola'
  };

  const handleScanResult = (code: string) => {
    // Simular resultado del escaneo
    Alert.alert(
      'Producto Encontrado',
      `${mockProduct.name}\nPrecio: $${mockProduct.price}\nStock: ${mockProduct.stock}`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Agregar al Carrito', onPress: () => router.back() }
      ]
    );
  };

  const startScanning = () => {
    setIsScanning(true);
    // Simular escaneo después de 2 segundos
    setTimeout(() => {
      setIsScanning(false);
      handleScanResult(mockProduct.id);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="mr-4 p-2"
          >
            <FontAwesome5 name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Área del escáner */}
        <View className="flex-1 items-center justify-center">
          <View className="w-80 h-80 border-2 border-blue-500 rounded-lg relative items-center justify-center mb-8">
            {isScanning ? (
              <View className="items-center">
                <FontAwesome5 name="camera" size={60} color="#3B82F6" />
                <Text className="text-blue-400 text-lg mt-4 animate-pulse">Escaneando...</Text>
                <View className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-pulse" />
              </View>
            ) : (
              <View className="items-center">
                <FontAwesome5 name="qrcode" size={60} color="#6B7280" />
                <Text className="text-gray-400 text-center mt-4 px-4">
                  Posiciona el código de barras dentro del marco
                </Text>
              </View>
            )}
            
            {/* Esquinas del marco */}
            <View className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-500" />
            <View className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-blue-500" />
            <View className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-blue-500" />
            <View className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-blue-500" />
          </View>

          {/* Botón de escanear */}
          <TouchableOpacity
            onPress={startScanning}
            disabled={isScanning}
            className={`p-4 rounded-full ${isScanning ? 'bg-gray-600' : 'bg-blue-600'} mb-6`}
          >
            <FontAwesome5 
              name={isScanning ? "spinner" : "camera"} 
              size={24} 
              color="white" 
            />
          </TouchableOpacity>

          {/* Entrada manual */}
          <View className="w-full max-w-sm">
            <Text className="text-white text-lg font-semibold mb-3 text-center">
              O ingresa el código manualmente
            </Text>
            <View className="flex-row items-center bg-gray-800 rounded-lg p-3 mb-4">
              <FontAwesome5 name="barcode" size={16} color="#9CA3AF" style={{ marginRight: 10 }} />
              <TextInput
                className="flex-1 text-white"
                placeholder="Código de barras..."
                placeholderTextColor="#9CA3AF"
                value={manualCode}
                onChangeText={setManualCode}
                keyboardType="numeric"
              />
            </View>
            
            <TouchableOpacity
              onPress={() => handleScanResult(manualCode)}
              disabled={!manualCode.trim()}
              className={`p-3 rounded-lg flex-row items-center justify-center ${
                manualCode.trim() ? 'bg-green-600' : 'bg-gray-600'
              }`}
            >
              <FontAwesome5 name="search" size={16} color="white" style={{ marginRight: 8 }} />
              <Text className="text-white font-semibold">Buscar Producto</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instrucciones */}
        <View className="bg-gray-800 p-4 rounded-lg">
          <Text className="text-white font-semibold mb-2">Instrucciones:</Text>
          <Text className="text-gray-400 text-sm">• Mantén el código de barras dentro del marco</Text>
          <Text className="text-gray-400 text-sm">• Asegúrate de tener buena iluminación</Text>
          <Text className="text-gray-400 text-sm">• El código debe estar completamente visible</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BarcodeScannerScreen; 