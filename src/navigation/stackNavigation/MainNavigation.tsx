import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "../bottomNavigation/BottomNavigation";
import StockInfoScreen from "../../screens/StockInfoScreen";
import AddTransactionScreen from "../../screens/additional/AddTransactionScreen";
import TransactionHistoryScreen from "../../screens/additional/TransactionHistoryScreen";
import SettingsScreen from "../../screens/additional/SettingsScreen";

export type MainStackParamList = {
    BottomNavigation: undefined;
    StockInfo: { ticker?: string; companyName?: string };
    AddTransaction: undefined;
    TransactionHistory: undefined;
    Settings: undefined;
};

const MainNavigation = () => {
    const Stack = createNativeStackNavigator<MainStackParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen 
                name="BottomNavigation" 
                component={BottomNavigation}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="StockInfo" 
                component={StockInfoScreen}
                options={{ title: 'Stock Info' }}
            />
            <Stack.Screen 
                name="AddTransaction" 
                component={AddTransactionScreen}
                options={{ title: 'Add Transaction' }}
            />
            <Stack.Screen 
                name="TransactionHistory" 
                component={TransactionHistoryScreen}
                options={{ title: 'Transaction History' }}
            />
            <Stack.Screen 
                name="Settings" 
                component={SettingsScreen}
                options={{ title: 'Settings' }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;