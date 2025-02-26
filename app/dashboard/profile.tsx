import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('user');

  return (
    <ScrollView className="h-full bg-black p-4">
      <View className="flex-row justify-center mb-4">
        <TouchableOpacity
          className={`p-2 rounded-md ${selectedTab === 'user' ? 'bg-gray-500' : 'bg-gray-800'}`}
          onPress={() => setSelectedTab('user')}
        >
          <FontAwesome name="user" size={22} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          className={`p-2 rounded-md ml-1 ${selectedTab === 'company' ? 'bg-gray-500' : 'bg-gray-800'}`}
          onPress={() => setSelectedTab('company')}
        >
          <MaterialCommunityIcons name="office-building-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {selectedTab === 'user' ? (
        <View className="bg-neutral-800 p-4 rounded-2xl mb-9">
          <View className='border-2 border-white rounded-md p-2 mt-9 items-center pb-11'>
            <Text className="text-white font-semibold text-2xl m-3 ">Información General</Text>
            <FontAwesome name="user-circle" size={55} color="white" />
            <Text className="text-gray-400 font-semibold text-2xl mt-5 mb-2">Admin Pepito</Text>
            <Text className="text-gray-400 text-md mb-1">Email: adminPepito@gmail.com</Text>
            <Text className="text-gray-400 text-md">Teléfono: 3142160192 </Text>
          </View>
          <View className='mt-5'>
            <View>
              <Text className="text-white mb-2 ">Nombre</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm mb-2"
                placeholder="Juan Camilo"
                placeholderTextColor="black"
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Apellido</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm mb-2"
                placeholder="Perez"
                placeholderTextColor="black"
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Télefono</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm  "
                placeholder="312-691-3146"
                placeholderTextColor="black"
              />
            </View>
          </View>
          <View className="flex-row justify-end mt-5">
            <TouchableOpacity className="bg-zinc-600 rounded-md p-2 mb-3 items-center w-[48%]">
              <Text className="text-white font-semibold">Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-neutral-800 p-4 rounded-2xl mb-9">
          <View className='border-2 border-white rounded-md p-2 mt-9 items-center pb-11'>
            <Text className="text-white font-semibold text-2xl m-3 text-center">Información De la Empresa</Text>
            <MaterialCommunityIcons name="office-building-outline" size={55} color="white" />
            <Text className="text-gray-400 font-semibold text-2xl mt-5 mb-2">Admin Pepito</Text>
            <Text className="text-gray-400 text-md">NIT: 9-120022 </Text>
            <Text className="text-gray-400 text-md">Teléfono: 3142160192 </Text>
          </View>
          <View className='mt-5'>
            <View>
              <Text className="text-white mb-2 ">Nombre</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm mb-2"
                placeholder="Juan Camilo"
                placeholderTextColor="black"
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Ciudad</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm mb-2"
                placeholder="Manizales"
                placeholderTextColor="black"
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Télefono</Text>
              <TextInput
                className=" bg-white text-black p-1 rounded-sm  "
                placeholder="312-691-3146"
                placeholderTextColor="black"
              />
            </View>
          </View>
          <View className="flex-row justify-end mt-5">
            <TouchableOpacity className="bg-zinc-600 rounded-md p-2 mb-3 items-center w-[48%]">
              <Text className="text-white font-semibold">Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;