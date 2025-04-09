import React from 'react';
import { View, Text } from 'react-native';

type Props = {
  message?: string;
};

const FormErrorMessage: React.FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <View className="flex-row items-start mt-2 ml-2 bg-red-100 border-l-4 border-red-500 p-2 rounded-md">
      <Text className="text-red-500 text-lg mr-1">❗</Text>
      <Text className="text-red-600 text-sm">
        {message}
      </Text>
    </View>
  );
};

export default FormErrorMessage;
