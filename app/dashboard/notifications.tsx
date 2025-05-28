import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { notificationsService } from '../../lib/notifications';
import { PERMISSIONS } from '../../constants/permissions';
import { ProtectedRoute } from '../../context/ProtectedRoute';

const NotificationsScreen = () => {
  const [sendingPlanUpgrade, setSendingPlanUpgrade] = useState(false);
  const [sendingPaymentReminder, setSendingPaymentReminder] = useState(false);

  const sendPlanUpgradeRecommendations = async () => {
    setSendingPlanUpgrade(true);
    try {
      await notificationsService.sendPlanUpgradeRecommendations();
      Alert.alert('Éxito', 'Recomendaciones de mejora de plan enviadas correctamente.');
    } catch (error) {
      console.error('Error al enviar recomendaciones de mejora de plan:', error);
      Alert.alert('Error', 'No se pudieron enviar las recomendaciones de mejora de plan.');
    } finally {
      setSendingPlanUpgrade(false);
    }
  };

  const sendPaymentReminders = async () => {
    setSendingPaymentReminder(true);
    try {
      await notificationsService.sendPaymentReminders();
      Alert.alert('Éxito', 'Recordatorios de pago enviados correctamente.');
    } catch (error) {
      console.error('Error al enviar recordatorios de pago:', error);
      Alert.alert('Error', 'No se pudieron enviar los recordatorios de pago.');
    } finally {
      setSendingPaymentReminder(false);
    }
  };

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_NOTIFICACIONES}>
      <ScrollView className="bg-black flex-1 p-4">
        <View className="mb-8">
          <Text className="text-white text-2xl font-bold mb-2">Centro de Notificaciones</Text>
        <Text className="text-gray-400">Envía notificaciones a los administradores del sistema</Text>
      </View>

      <View className="space-y-6">
        <TouchableOpacity
          onPress={sendPlanUpgradeRecommendations}
          className="bg-blue-600 p-4 rounded-lg items-center flex-row justify-center mb-4"
          disabled={sendingPlanUpgrade}
        >
          {sendingPlanUpgrade ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : (
            <FontAwesome5 name="arrow-up" size={18} color="white" style={{ marginRight: 8 }} />
          )}
          <Text className="text-white font-semibold text-lg">Enviar Recomendaciones de Mejora de Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={sendPaymentReminders}
          className="bg-orange-600 p-4 rounded-lg items-center flex-row justify-center"
          disabled={sendingPaymentReminder}
        >
          {sendingPaymentReminder ? (
            <ActivityIndicator color="white" style={{ marginRight: 8 }} />
          ) : (
            <FontAwesome5 name="credit-card" size={18} color="white" style={{ marginRight: 8 }} />
          )}
          <Text className="text-white font-semibold text-lg">Enviar Recordatorios de Pago</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

export default NotificationsScreen; 