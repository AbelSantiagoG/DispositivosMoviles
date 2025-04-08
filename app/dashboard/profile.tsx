import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService, UpdateProfileData } from '../../lib/auth';
import { useRouter } from "expo-router";
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('user');
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  
  // Estados para los campos del formulario de empresa
  const [enterpriseName, setEnterpriseName] = useState('');
  const [enterpriseNIT, setEnterpriseNIT] = useState('');
  const [enterpriseTelephone, setEnterpriseTelephone] = useState('');

  // Inicializar los valores de los campos
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLastname(user.lastname || '');
      setTelephone(user.telephone || '');
      
      if (user.enterprise) {
        setEnterpriseName(user.enterprise.name || '');
        setEnterpriseNIT(user.enterprise.NIT || '');
        setEnterpriseTelephone(user.telephone || '');
      }
    }
  }, [user]);

  const logout = async () => {
    await authService.logout();
    const token = await AsyncStorage.getItem('@auth');
    //console.log(token);
    router.replace('/login');
  }

  const updateUserProfile = async () => {
    setIsUpdating(true);
    setError(null);
    
    try {
      // Solo enviamos los campos que no estén vacíos
      const updateData: UpdateProfileData = {};
      
      if (name.trim() !== '') updateData.name = name;
      if (lastname.trim() !== '') updateData.lastname = lastname;
      if (telephone.trim() !== '') updateData.telephone = telephone;
      
      // Verificar si hay al menos un campo para actualizar
      if (Object.keys(updateData).length === 0) {
        Alert.alert("Información", "No hay cambios para actualizar");
        setIsUpdating(false);
        return;
      }
      
      // Actualizar el perfil
      const updatedUser = await authService.updateUserProfile(updateData);
      
      // Actualizar el estado global del usuario
      if (updatedUser) {
        // Obtenemos los datos actualizados del usuario
        const refreshedUser = await authService.getCurrentUser();
        if (refreshedUser) {
          setUser(refreshedUser);
          Alert.alert("Éxito", "Perfil actualizado correctamente");
        }
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setError('No se pudo actualizar el perfil');
    } finally {
      setIsUpdating(false);
    }
  };

  // Por ahora la actualización de la empresa no está implementada
  const updateEnterpriseProfile = () => {
    Alert.alert("Información", "La actualización de datos de la empresa aún no está disponible");
  };

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

      {error && (
        <Text className="text-red-500 text-center mb-4">{error}</Text>
      )}

      {selectedTab === 'user' ? (
        <View className="bg-neutral-800 p-4 rounded-2xl mb-9">
          <View className='border-2 border-white rounded-md p-2 mt-9 items-center pb-11'>
            <Text className="text-white font-semibold text-2xl m-3 ">Información General</Text>
            <FontAwesome name="user-circle" size={55} color="white" />
            <Text className="text-gray-400 font-semibold text-2xl mt-5 mb-2">{user?.name} {user?.lastname}</Text>
            <Text className="text-gray-400 text-md mb-1">Email: {user?.email}</Text>
            <Text className="text-gray-400 text-md">Teléfono: {user?.telephone}</Text>
          </View>
          <View className='mt-5'>
            <View>
              <Text className="text-white mb-2 ">Nombre</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm mb-2"
                placeholder={user?.name}
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Apellido</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm mb-2"
                placeholder={user?.lastname}
                placeholderTextColor="#888"
                value={lastname}
                onChangeText={setLastname}
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Teléfono</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm"
                placeholder={user?.telephone}
                placeholderTextColor="#888"
                value={telephone}
                onChangeText={setTelephone}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View className="flex-row justify-end mt-5">
            <TouchableOpacity 
              className={`bg-zinc-600 rounded-md p-2 mb-3 items-center w-[48%] ${isUpdating ? 'opacity-70' : ''}`}
              onPress={updateUserProfile}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-semibold">Actualizar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-neutral-800 p-4 rounded-2xl mb-9">
          <View className='border-2 border-white rounded-md p-2 mt-9 items-center pb-11'>
            <Text className="text-white font-semibold text-2xl m-3 text-center">Información De la Empresa</Text>
            <MaterialCommunityIcons name="office-building-outline" size={55} color="white" />
            <Text className="text-gray-400 font-semibold text-2xl mt-5 mb-2">{user?.enterprise.name}</Text>
            <Text className="text-gray-400 text-md">NIT: {user?.enterprise.NIT}</Text>
            <Text className="text-gray-400 text-md">Teléfono: {user?.telephone}</Text>
          </View>
          <View className='mt-5'>
            <View>
              <Text className="text-white mb-2 ">Nombre</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm mb-2"
                placeholder={user?.enterprise.name}
                placeholderTextColor="#888"
                value={enterpriseName}
                onChangeText={setEnterpriseName}
                editable={false}
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">NIT</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm mb-2"
                placeholder={user?.enterprise.NIT}
                placeholderTextColor="#888"
                value={enterpriseNIT}
                onChangeText={setEnterpriseNIT}
                editable={false}
              />
            </View>
            <View>
              <Text className="text-white mb-2 ">Teléfono</Text>
              <TextInput
                className="bg-white text-black p-1 rounded-sm"
                placeholder={user?.telephone}
                placeholderTextColor="#888"
                value={enterpriseTelephone}
                onChangeText={setEnterpriseTelephone}
                keyboardType="phone-pad"
                editable={false}
              />
            </View>
          </View>
          <View className="flex-row justify-end mt-5">
            <TouchableOpacity 
              className="bg-zinc-600 rounded-md p-2 mb-3 items-center w-[48%] opacity-50"
              onPress={updateEnterpriseProfile}
              disabled={true}
            >
              <Text className="text-white font-semibold">Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      <TouchableOpacity 
        onPress={logout} 
        className="bg-gradient-to-r  rounded-full p-4 mt-3 mb-9 items-center w-full bg-neutral-800"
      >
        <View className="flex-row items-center justify-center">
          <FontAwesome name="sign-out" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-lg">Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;