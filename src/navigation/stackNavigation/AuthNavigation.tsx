import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from '../../screens/auth/RegistrationScreen';
import LoginScreen from '../../screens/auth/LoginScree';
import WelcomeScreen from '../../screens/WelcomeScreen';

export type AuthStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Registration: undefined;
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
        </Stack.Navigator>
    )
}

export default AuthNavigation;