import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { PERMISSIONS } from '../../../constants/permissions';
import { router } from 'expo-router';
import { useProductService } from '../../../lib/products';
import { useCart } from '../../../context/CartContext';

interface Product {
  id: number;
  name: string;
  public_price: number;
  stock: number;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  public_price: number;
  quantity: number;
  category: string;
}

const CashierScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const productService = useProductService();
  
  // Usar el contexto del carrito
  const { cartItems, addToCart, getTotalAmount } = useCart();

  // Cargar productos al iniciar
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await productService.getAllProducts();
      setProducts(response || []);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('No se pudieron cargar los productos');
      Alert.alert('Error', 'No se pudieron cargar los productos. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Agregar producto al carrito
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      Alert.alert('Sin Stock', 'Este producto no tiene stock disponible.');
      return;
    }

    // Verificar si ya existe en el carrito y el stock disponible
    const existingItem = cartItems.find(item => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    
    if (currentQuantity >= product.stock) {
      Alert.alert('Stock Insuficiente', `Solo hay ${product.stock} unidades disponibles.`);
      return;
    }

    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      public_price: product.public_price,
      quantity: 1,
      category: product.category
    };

    addToCart(newItem);
  };

  const totalAmount = getTotalAmount();
  const lastAddedProduct = cartItems.length > 0 ? cartItems[cartItems.length - 1] : null;

  if (loading) {
    return (
      <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_VENTAS}>
        <SafeAreaView className="flex-1 bg-black items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-white mt-4 text-lg">Cargando productos...</Text>
        </SafeAreaView>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_VENTAS}>
        <SafeAreaView className="flex-1 bg-black items-center justify-center p-4">
          <FontAwesome5 name="exclamation-triangle" size={60} color="#EF4444" />
          <Text className="text-white mt-4 text-lg text-center">{error}</Text>
          <TouchableOpacity
            onPress={loadProducts}
            className="bg-blue-600 px-6 py-3 rounded-lg mt-4"
          >
            <Text className="text-white font-semibold">Reintentar</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_VENTAS}>
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1">
          {/* Header y búsqueda */}
          <View className="p-3 border-b border-gray-700">
            <Text className="text-white text-xl font-bold mb-3">Punto de Venta</Text>
            
            <View className="flex-row items-center bg-gray-800 rounded-lg pl-3">
              <FontAwesome5 name="search" size={16} color="#9CA3AF" style={{ marginRight: 10 }} />
              <TextInput
                className="flex-1 text-white p-2"
                placeholder="Buscar por nombre o categoría..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Lista de productos */}
          <ScrollView className="flex-1 p-3" contentContainerStyle={{ paddingBottom: 140 }}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-semibold">Productos Disponibles</Text>
              <TouchableOpacity onPress={loadProducts}>
                <FontAwesome5 name="sync-alt" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            {filteredProducts.length === 0 ? (
              <View className="flex-1 items-center justify-center py-20">
                <FontAwesome5 name="box-open" size={60} color="#6B7280" />
                <Text className="text-gray-400 text-lg mt-4">
                  {searchQuery ? 'No se encontraron productos' : 'No hay productos disponibles'}
                </Text>
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {filteredProducts.map((product) => {
                  const cartItem = cartItems.find(item => item.id === product.id);
                  const quantityInCart = cartItem ? cartItem.quantity : 0;
                  const availableStock = product.stock - quantityInCart;
                  
                  return (
                    <TouchableOpacity
                      key={product.id}
                      onPress={() => handleAddToCart(product)}
                      className="bg-gray-800 p-4 rounded-lg mb-4 border border-gray-700"
                      style={{ width: '48%' }}
                      disabled={availableStock <= 0}
                    >
                      <Text className="text-white font-semibold text-lg mb-2" numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text className="text-green-400 font-bold text-xl mb-2">
                        ${product?.public_price?.toFixed(2)}
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View>
                          <Text className={`text-sm ${availableStock > 0 ? 'text-gray-400' : 'text-red-400'}`}>
                            Stock: {availableStock}
                          </Text>
                          {quantityInCart > 0 && (
                            <Text className="text-blue-400 text-xs">
                              En carrito: {quantityInCart}
                            </Text>
                          )}
                        </View>
                        <View className={`w-8 h-8 rounded items-center justify-center ${
                          availableStock > 0 ? 'bg-green-600' : 'bg-gray-600'
                        }`}>
                          <FontAwesome5 
                            name="plus" 
                            size={14} 
                            color="white" 
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>

          {/* Panel inferior fijo */}
          <View className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-3">
            {/* Información de la venta */}
            <View className="mb-3">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-400">Total de la venta:</Text>
                <Text className="text-green-400 font-bold text-lg">
                  ${(totalAmount * 1.12).toFixed(2)}
                </Text>
              </View>
              
              {lastAddedProduct && (
                <View className="bg-gray-800 p-2 rounded-lg">
                  <Text className="text-gray-400 text-xs mb-1">Último producto agregado:</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white font-medium text-sm">{lastAddedProduct.name}</Text>
                    <Text className="text-green-400 font-semibold text-sm">
                      {lastAddedProduct.quantity}x ${lastAddedProduct?.public_price?.toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Botones de acción */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => router.push('/dashboard/cashier/barcode-scanner')}
                className="bg-blue-600 rounded-lg flex-1 flex-row items-center justify-center p-3"
              >
                <FontAwesome5 name="camera" size={16} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.push('/dashboard/cashier/cart-summary')}
                className="bg-orange-600 rounded-lg flex-2 flex-row items-center justify-center p-3"
                style={{ flex: 2 }}
              >
                <FontAwesome5 name="shopping-cart" size={14} color="white" style={{ marginRight: 6 }} />
                <Text className="text-white font-semibold text-sm">Ver Resumen de Compra</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ProtectedRoute>
  );
};

export default CashierScreen; 