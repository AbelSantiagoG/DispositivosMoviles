import { View, Text, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { 
    progressContainer, 
    activeStep, 
    inactiveStep,
    activeStepText,
    inactiveStepText 
} from '../Tokens';
import { router } from 'expo-router';
import { useRegister } from '../../context/RegisterContext';

interface ProgressStepsProps {
    currentStep: 1 | 2 | 3;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
    const { stepValidation } = useRegister();

    const handleStepPress = (step: number, route: string) => {
        if (step <= currentStep) {
            router.push(route);
        }
    };

    return (
        <View className={progressContainer}>
            <TouchableOpacity 
                className="flex-row items-center mx-2"
                onPress={() => handleStepPress(1, '/register')}
            >
                <View className={currentStep === 1 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 1 ? activeStepText : inactiveStepText}>1</Text>
                </View>
                <Feather name="user" size={20} color="white" className='ml-1' />
            </TouchableOpacity>
            <TouchableOpacity 
                className="flex-row items-center mx-2"
                onPress={() => handleStepPress(2, '/register/empresa')}
            >
                <View className={currentStep === 2 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 2 ? activeStepText : inactiveStepText}>2</Text>
                </View>
                <FontAwesome name="building-o" size={20} color="white" className='ml-1' />
            </TouchableOpacity>
            <TouchableOpacity 
                className="flex-row items-center mx-2"
                onPress={() => handleStepPress(3, '/register/plan')}
            >
                <View className={currentStep === 3 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 3 ? activeStepText : inactiveStepText}>3</Text>
                </View>
                <AntDesign name="shoppingcart" size={20} color="white" className='ml-1' />
            </TouchableOpacity>
        </View>
    );
} 