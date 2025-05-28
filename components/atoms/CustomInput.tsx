import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { inputContainer, inputLabel, input, errorText } from '../Tokens';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    control: Control<any>;
    name: string;
    label: string;
    error?: string;
}

export function CustomInput({ control, name, label, error, ...rest }: CustomInputProps) {
    return (
        <View>
            <Text className={inputLabel}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <View>
                        <TextInput
                            className={inputContainer}
                            onChangeText={onChange}
                            value={value}
                            placeholderTextColor="#666"
                            {...rest}
                        />
                        {error && (
                            <View className="flex-row items-center mx-6 mt-1">
                                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                                <Text className="text-red-500 text-sm ml-1">{error}</Text>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
} 