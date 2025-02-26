import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, useRouter } from "expo-router";

const products = () => {
  return (
    <View className='h-full bg-black p-4'>
      <ScrollView >
        <View className="flex flex-row flex-wrap justify-between mb-2">
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
          <Link href='/dashboard/inventory/productDetails' asChild>
            <TouchableOpacity className='w-[48%] mb-9'>
              <View className="bg-neutral-800  rounded-2xl mb-4">
                <View >
                  <Image source={require('../../../assets/product.png')} className='w-full' />
                </View>
              </View>
              <Text className="text-white font-semibold ">Coca-Cola</Text>
              <Text className="text-white text-sm">$1.50</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>

      <TouchableOpacity className="absolute bottom-4 right-4 bg-white rounded-full p-4 mb-3">
        <Text className="text-black font-semibold"> ➕ Agregar Producto</Text>
      </TouchableOpacity>
    </View>
  )
}

export default products