import { View, Image } from 'react-native';
import { logoContainer, logoWrapper, logo } from '../Tokens';

export function Logo() {
    return (
        <Image 
            className={logo} 
            source={require("../../assets/logo.png")} 
            resizeMode="contain"
            testID="logo-image" 
        />
    );
}