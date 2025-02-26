import { View, Image } from 'react-native';
import { logoContainer, logoWrapper, logo } from '../Tokens';

export function Logo() {
    return (
        <View className={logoContainer}>
            <View className={logoWrapper}>
                <Image 
                    className={logo} 
                    source={require("../../assets/logo.png")} 
                    resizeMode="contain" 
                />
            </View>
        </View>
    );
} 