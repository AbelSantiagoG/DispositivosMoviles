import { View, Text } from 'react-native';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { 
    progressContainer, 
    activeStep, 
    inactiveStep,
    activeStepText,
    inactiveStepText 
} from '../Tokens';

interface ProgressStepsProps {
    currentStep: 1 | 2 | 3;
}

export function ProgressSteps({ currentStep }: ProgressStepsProps) {
    return (
        <View className={progressContainer}>
            <View className="flex-row items-center mx-2">
                <View className={currentStep === 1 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 1 ? activeStepText : inactiveStepText}>1</Text>
                </View>
                <Feather name="user" size={20} color="white" className='ml-1' />
            </View>
            <View className="flex-row items-center mx-2">
                <View className={currentStep === 2 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 2 ? activeStepText : inactiveStepText}>2</Text>
                </View>
                <FontAwesome name="building-o" size={20} color="white" className='ml-1' />
            </View>
            <View className="flex-row items-center mx-2">
                <View className={currentStep === 3 ? activeStep : inactiveStep}>
                    <Text className={currentStep === 3 ? activeStepText : inactiveStepText}>3</Text>
                </View>
                <AntDesign name="shoppingcart" size={20} color="white" className='ml-1' />
            </View>
        </View>
    );
} 