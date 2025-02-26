import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomInput } from '../atoms/CustomInput';
import { Button } from '../atoms/Button';
import { ProgressSteps } from '../molecules/ProgressSteps';
import { UserFormData, userFormSchema } from '../../validators/register';

interface RegisterFormProps {
    onSubmit: (data: UserFormData) => void;
    formType: 'user' | 'empresa';
}

export function RegisterForm({ onSubmit, formType }: RegisterFormProps) {
    const { control, handleSubmit, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(userFormSchema)
    });

    const renderUserForm = () => (
        <>
            <CustomInput
                control={control}
                name="nombre"
                label="Nombre"
                placeholder="Nombre"
                error={errors.nombre?.message}
            />
            <CustomInput
                control={control}
                name="apellido"
                label="Apellido"
                placeholder="Apellido"
                error={errors.apellido?.message}
            />
            <CustomInput
                control={control}
                name="email"
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
            />
            <CustomInput
                control={control}
                name="telefono"
                label="Teléfono"
                placeholder="Teléfono"
                keyboardType="phone-pad"
                error={errors.telefono?.message}
            />
            <CustomInput
                control={control}
                name="clave"
                label="Clave"
                placeholder="Clave"
                secureTextEntry
                error={errors.clave?.message}
            />
            <CustomInput
                control={control}
                name="repetirClave"
                label="Repetir clave"
                placeholder="Repetir clave"
                secureTextEntry
                error={errors.repetirClave?.message}
            />
        </>
    );

    const renderEmpresaForm = () => (
        <>
            <CustomInput
                control={control}
                name="nit"
                label="NIT"
                placeholder="NIT"
                keyboardType="numeric"
                error={errors.nit?.message}
            />
            <CustomInput
                control={control}
                name="nombre"
                label="Nombre de la Empresa"
                placeholder="Nombre de la Empresa"
                error={errors.nombre?.message}
            />
            <CustomInput
                control={control}
                name="email"
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
            />
            <CustomInput
                control={control}
                name="telefono"
                label="Teléfono"
                placeholder="Teléfono"
                keyboardType="phone-pad"
                error={errors.telefono?.message}
            />
            <CustomInput
                control={control}
                name="ciudad"
                label="Ciudad"
                placeholder="Ciudad"
                error={errors.ciudad?.message}
            />
        </>
    );

    return (
        <View>
            <ProgressSteps currentStep={formType === 'user' ? 1 : 2} />
            <View>
                {formType === 'user' ? renderUserForm() : renderEmpresaForm()}
                <Button
                    title="Continuar"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </View>
    );
} 