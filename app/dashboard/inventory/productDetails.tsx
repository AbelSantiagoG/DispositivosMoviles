import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from "expo-router";

const productDetails = () => {
    return (
        <ScrollView className='h-full bg-black p-4'>
            <View className='rounded-2xl overflow-hidden h-64'>
                <Image source={require('../../../assets/detailsProduct.png')} className='w-full h-full' />
            </View>
            <View className='mt-4'>
                <Text className="text-gray-400 text-sm mt-2 mb-1">Bebidas</Text>
                <Text className="text-white font-semibold text-4xl">Coca-Cola</Text>
                <Text className="text-white text-sm">$1.50</Text>
                <Text className="text-white text-sm mt-2">Coca-Cola is a carbonated soft drink manufactured by The Coca-Cola Company.</Text>
                <Text className="text-gray-400 text-sm mt-2 mb-4">Ver más detalles</Text>
            </View>
            <View className='flex-row  justify-between mb-7'>
                <TouchableOpacity className=" bg-zinc-800 rounded-full p-4 mb-3 w-[48%] items-center">
                    <Text className="text-white font-semibold"> Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity className=" bg-white rounded-full p-4 mb-3 w-[48%] items-center">
                    <Text className="text-black font-semibold"> Eliminar </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default productDetails