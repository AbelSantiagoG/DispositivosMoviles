import { TextInput, TextInputProps, Text, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { inputContainer, inputLabel, errorText } from '../Tokens';

interface CustomInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value'> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    error?: string;
}

export function CustomInput<T extends FieldValues>({ 
    control, 
    name, 
    label, 
    error,
    ...props 
}: CustomInputProps<T>) {
    return (
        <View>
            <Text className={inputLabel}>{label}</Text>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className={inputContainer}
                        placeholderTextColor="#666"
                        onChangeText={onChange}
                        value={value}
                        {...props}
                    />
                )}
            />
            {error && (
                <Text className={errorText}>{error}</Text>
            )}
        </View>
    );
} 