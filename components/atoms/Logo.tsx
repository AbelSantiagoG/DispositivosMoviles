import React from 'react';
import { Image } from 'react-native';

export const Logo = () => {
  return (
    <Image
      testID="logo-image"
      source={require('../../assets/logo.png')}
      style={{
        width: 200,
        height: 200,
      }}
      resizeMode="contain"
    />
  );
}; 