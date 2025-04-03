import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { notificationsService } from '../../lib/notifications';
import { usePushNotifications } from '../../hooks/usePushNotifications';
import { UserNotificationList } from '../../components/molecules/UserNotificationList';
import { authService } from '../../lib/auth';

interface Employee {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

const NotificationsScreen = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [registering, setRegistering] = useState(false);
  const { expoPushToken } = usePushNotifications();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await notificationsService.getUsers();
      setEmployees(response.data || []);
    } catch (error) {
      console.error('Error al obtener la lista de empleados:', error);
      Alert.alert('Error', 'No se pudo cargar la lista de empleados.');
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    setSending(true);
    try {
      await notificationsService.sendTestNotification();
      Alert.alert('Éxito', 'Notificación de prueba enviada correctamente.');
    } catch (error) {
      console.error('Error al enviar notificación de prueba:', error);
      Alert.alert('Error', 'No se pudo enviar la notificación de prueba.');
    } finally {
      setSending(false);
    }
  };

  const sendToUser = async (userId: string, name: string) => {
    setSending(true);
    try {
      await notificationsService.sendToUser(userId);
      Alert.alert('Éxito', `Notificación enviada a ${name} correctamente.`);
    } catch (error) {
      console.error(`Error al enviar notificación al usuario ${userId}:`, error);
      Alert.alert('Error', `No se pudo enviar la notificación a ${name}.`);
    } finally {
      setSending(false);
    }
  };

  const registerToken = async () => {
    if (!expoPushToken?.data) {
      Alert.alert('Error', 'No hay token disponible para registrar.');
      return;
    }

    setRegistering(true);
    try {
      await authService.registerPushToken(expoPushToken.data);
      Alert.alert('Éxito', 'Token registrado correctamente.');
    } catch (error) {
      console.error('Error al registrar el token:', error);
      Alert.alert('Error', 'No se pudo registrar el token.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <ScrollView className="bg-black flex-1 p-4">
      <View className="mb-6">
        <Text className="text-white text-2xl font-bold mb-2">Centro de Notificaciones</Text>
        <View className="flex-row items-center justify-between">
          <Text className={expoPushToken ? "text-gray-400" : "text-red-400"}>
            {expoPushToken ? "Token del dispositivo registrado" : "Token del dispositivo no registrado"}
          </Text>
          <TouchableOpacity 
            onPress={registerToken} 
            disabled={registering || !expoPushToken}
            className="bg-green-700 px-3 py-2 rounded-lg"
          >
            {registering ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white">Actualizar Token</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={sendTestNotification}
        className="bg-blue-600 p-4 rounded-lg mb-6 items-center flex-row justify-center"
        disabled={sending}
      >
        {sending ? (
          <ActivityIndicator color="white" style={{ marginRight: 8 }} />
        ) : (
          <FontAwesome5 name="bell" size={18} color="white" style={{ marginRight: 8 }} />
        )}
        <Text className="text-white font-semibold text-lg">Enviar notificación de prueba</Text>
      </TouchableOpacity>

      <View>
        <Text className="text-white text-xl font-semibold mb-4">Enviar a un usuario específico</Text>
        <UserNotificationList 
          users={employees}
          onSendNotification={sendToUser}
          loading={loading}
          sending={sending}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationsScreen; 