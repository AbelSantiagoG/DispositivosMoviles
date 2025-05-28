import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { authService, UpdateProfileData } from '../../lib/auth';
import { notificationsService } from '../../lib/notifications';
import { useRouter } from "expo-router";
import { useAuth } from '../../context/AuthContext';
import Toast from "react-native-toast-message";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState('user');
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [sendingPanic, setSendingPanic] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los campos del formulario
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  
  // Estados para los campos del formulario de empresa
  const [enterpriseName, setEnterpriseName] = useState('');
  const [enterpriseNIT, setEnterpriseNIT] = useState('');
  const [enterpriseTelephone, setEnterpriseTelephone] = useState('');
  
  // Estados para los errores de validación
  const [nameError, setNameError] = useState<string | null>(null);
  const [lastnameError, setLastnameError] = useState<string | null>(null);
  const [telephoneError, setTelephoneError] = useState<string | null>(null);

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

  // Validaciones de campos
  const validateUserFields = () => {
    // Resetear errores
    setNameError(null);
    setLastnameError(null);
    setTelephoneError(null);
    
    let isValid = true;
    
    // Validar nombre
    if (name.trim() !== '' && name.trim().length < 2) {
      const errorMsg = 'El nombre debe tener al menos 2 caracteres';
      setNameError(errorMsg);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error de validación',
        text2: errorMsg,
        visibilityTime: 3000,
      });
      isValid = false;
    }

    // Validar apellido
    if (lastname.trim() !== '' && lastname.trim().length < 2) {
      const errorMsg = 'El apellido debe tener al menos 2 caracteres';
      setLastnameError(errorMsg);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error de validación',
        text2: errorMsg,
        visibilityTime: 3000,
      });
      isValid = false;
    }

    // Validar teléfono
    if (telephone.trim() !== '') {
      // Verificar que sea numérico y tenga longitud adecuada
      const phoneRegex = /^\d{7,15}$/;
      if (!phoneRegex.test(telephone.trim())) {
        const errorMsg = 'El teléfono debe contener solo números y tener entre 7 y 15 dígitos';
        setTelephoneError(errorMsg);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error de validación',
          text2: errorMsg,
          visibilityTime: 3000,
        });
        isValid = false;
      }
    }

    return isValid;
  };

  const updateUserProfile = async () => {
    setIsUpdating(true);
    setError(null);
    
    try {
      // Validar los campos antes de enviar
      if (!validateUserFields()) {
        setIsUpdating(false);
        return;
      }

      // Solo enviamos los campos que no estén vacíos
      const updateData: UpdateProfileData = {};
      
      if (name.trim() !== '') updateData.name = name;
      if (lastname.trim() !== '') updateData.lastname = lastname;
      if (telephone.trim() !== '') updateData.telephone = telephone;
      
      // Verificar si hay al menos un campo para actualizar
      if (Object.keys(updateData).length === 0) {
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: 'Información',
          text2: 'No hay cambios para actualizar',
          visibilityTime: 3000,
        });
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
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Éxito',
            text2: 'Perfil actualizado correctamente',
            visibilityTime: 3000,
          });
        }
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setError('No se pudo actualizar el perfil');
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: 'No se pudo actualizar el perfil',
        visibilityTime: 3000,
      });
    } finally {
      setIsUpdating(false);
    }
  };


  const updateEnterpriseProfile = () => {
    Toast.show({
      type: 'info',
      position: 'bottom',
      text1: 'Información',
      text2: 'La actualización de datos de la empresa aún no está disponible',
      visibilityTime: 3000,
    });
  };

  const sendPanicAlert = async () => {
    Alert.alert(
      '🚨 BOTÓN DE PÁNICO',
      '¿Estás seguro de que quieres enviar una alerta de pánico? Esto notificará a todos los empleados que te encuentras en peligro.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'ENVIAR ALERTA',
          style: 'destructive',
          onPress: async () => {
            setSendingPanic(true);
            try {
              await notificationsService.sendPanicAlert();
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: '🚨 Alerta Enviada',
                text2: 'Se ha notificado a todos los empleados sobre la situación de emergencia',
                visibilityTime: 5000,
              });
            } catch (error) {
              console.error('Error al enviar alerta de pánico:', error);
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: 'No se pudo enviar la alerta de pánico. Intenta nuevamente.',
                visibilityTime: 4000,
              });
            } finally {
              setSendingPanic(false);
            }
          }
        }
      ]
    );
  };

  const validateOnBlur = (field: 'name' | 'lastname' | 'telephone') => {
    switch (field) {
      case 'name':
        if (name.trim() !== '' && name.trim().length < 2) {
          setNameError('El nombre debe tener al menos 2 caracteres');
        } else {
          setNameError(null);
        }
        break;
      case 'lastname':
        if (lastname.trim() !== '' && lastname.trim().length < 2) {
          setLastnameError('El apellido debe tener al menos 2 caracteres');
        } else {
          setLastnameError(null);
        }
        break;
      case 'telephone':
        if (telephone.trim() !== '') {
          const phoneRegex = /^\d{7,15}$/;
          if (!phoneRegex.test(telephone.trim())) {
            setTelephoneError('El teléfono debe contener solo números y tener entre 7 y 15 dígitos');
          } else {
            setTelephoneError(null);
          }
        } else {
          setTelephoneError(null);
        }
        break;
    }
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
                className={`bg-white text-black p-1 rounded-sm mb-1 ${nameError ? 'border-2 border-red-500' : ''}`}
                placeholder={user?.name}
                placeholderTextColor="#888"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (nameError) validateOnBlur('name');
                }}
                onBlur={() => validateOnBlur('name')}
              />
              {nameError && <Text className="text-red-500 text-xs mb-2">{nameError}</Text>}
            </View>
            <View>
              <Text className="text-white mb-2 ">Apellido</Text>
              <TextInput
                className={`bg-white text-black p-1 rounded-sm mb-1 ${lastnameError ? 'border-2 border-red-500' : ''}`}
                placeholder={user?.lastname}
                placeholderTextColor="#888"
                value={lastname}
                onChangeText={(text) => {
                  setLastname(text);
                  if (lastnameError) validateOnBlur('lastname');
                }}
                onBlur={() => validateOnBlur('lastname')}
              />
              {lastnameError && <Text className="text-red-500 text-xs mb-2">{lastnameError}</Text>}
            </View>
            <View>
              <Text className="text-white mb-2 ">Teléfono</Text>
              <TextInput
                className={`bg-white text-black p-1 rounded-sm mb-1 ${telephoneError ? 'border-2 border-red-500' : ''}`}
                placeholder={user?.telephone}
                placeholderTextColor="#888"
                value={telephone}
                onChangeText={(text) => {
                  setTelephone(text);
                  if (telephoneError) validateOnBlur('telephone');
                }}
                onBlur={() => validateOnBlur('telephone')}
                keyboardType="phone-pad"
              />
              {telephoneError && <Text className="text-red-500 text-xs">{telephoneError}</Text>}
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
      
      {/* Botón de Pánico */}
      <TouchableOpacity 
        onPress={sendPanicAlert}
        disabled={sendingPanic}
        className={`bg-red-600 rounded-full p-4 mt-6 mb-4 items-center w-full border-2 border-red-400 ${sendingPanic ? 'opacity-70' : ''}`}
      >
        <View className="flex-row items-center justify-center">
          {sendingPanic ? (
            <ActivityIndicator size="small" color="white" style={{ marginRight: 8 }} />
          ) : (
            <FontAwesome name="exclamation-triangle" size={24} color="white" style={{ marginRight: 12 }} />
          )}
          <Text className="text-white font-bold text-lg">
            {sendingPanic ? 'ENVIANDO ALERTA...' : '🚨 BOTÓN DE PÁNICO 🚨'}
          </Text>
        </View>
        <Text className="text-red-200 text-sm mt-2 text-center">
          Presiona solo en caso de emergencia
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={logout} 
        className="bg-gradient-to-r  rounded-full p-4 mt-3 mb-9 items-center w-full bg-neutral-800"
      >
        <View className="flex-row items-center justify-center">
          <FontAwesome name="sign-out" size={20} color="white" style={{ marginRight: 8 }} />
          <Text className="text-white font-bold text-lg">Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
      
      <Toast />
    </ScrollView>
  );
};

export default Profile;