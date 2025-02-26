import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { primaryButton, primaryButtonText, secondaryButton, secondaryButtonText } from '../Tokens';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', ...props }: ButtonProps) {
    const buttonStyle = variant === 'primary' ? primaryButton : secondaryButton;
    const textStyle = variant === 'primary' ? primaryButtonText : secondaryButtonText;

    return (
        <TouchableOpacity className={buttonStyle} {...props}>
            <Text className={textStyle}>{title}</Text>
        </TouchableOpacity>
    );
} 