import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import LoginScreen from '../../screens/auth/LoginScree';
import WelcomeScreen from '../../screens/WelcomeScreen';
import TermsConditionsScreen from '../../screens/auth/TermsConditionsScreen';
import PrivacyPolicyScreen from '../../screens/auth/PrivacyPolicyScreen';

export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Registration: undefined;
    TermsConditions: undefined;
    PrivacyPolicy: undefined;
};

const AuthNavigation = () => {
    const Stack = createNativeStackNavigator<AuthStackParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
               
            />
            <Stack.Screen 
                name="Registration" 
                component={RegistrationScreen}
             
            />
            <Stack.Screen 
                name="TermsConditions" 
                component={TermsConditionsScreen}
            />
            <Stack.Screen 
                name="PrivacyPolicy" 
                component={PrivacyPolicyScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigation;