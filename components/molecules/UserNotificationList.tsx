import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
}

interface UserNotificationListProps {
  users: User[];
  onSendNotification: (userId: string, name: string) => void;
  loading: boolean;
  sending: boolean;
}

export const UserNotificationList = ({ 
  users, 
  onSendNotification, 
  loading, 
  sending 
}: UserNotificationListProps) => {
  
  const renderUserItem = ({ item }: { item: User }) => (
    <View className="bg-neutral-800 p-4 rounded-lg mb-3 flex-row justify-between items-center">
      <View className="flex-1 mr-4">
        <Text className="text-white font-semibold text-lg">{item.name} {item.lastname}</Text>
        <Text className="text-gray-400 text-sm" numberOfLines={1}>{item.email}</Text>
      </View>
      <TouchableOpacity
        onPress={() => onSendNotification(item.id, `${item.name} ${item.lastname}`)}
        className="bg-blue-600 p-3 rounded-lg"
        disabled={sending}
      >
        {sending ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <FontAwesome5 name="paper-plane" size={16} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="justify-center items-center py-10">
        <ActivityIndicator size="large" color="#3498db" />
        <Text className="text-gray-400 mt-4">Cargando usuarios...</Text>
      </View>
    );
  }

  if (users.length === 0) {
    return (
      <View className="justify-center items-center py-10">
        <FontAwesome5 name="users-slash" size={30} color="#718096" />
        <Text className="text-gray-400 mt-4">No hay usuarios disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      renderItem={renderUserItem}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
    />
  );
}; 