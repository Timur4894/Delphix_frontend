import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "../bottomNavigation/BottomNavigation";
import StockInfoScreen from "../../screens/StockInfoScreen";
import AddTransactionScreen from "../../screens/additional/AddTransactionScreen";
import TransactionHistoryScreen from "../../screens/additional/TransactionHistoryScreen";
import SettingsScreen from "../../screens/additional/SettingsScreen";
import CompanyInfoScreen from "../../screens/additional/CompanyInfoScreen";
import EditProfileScreen from "../../screens/additional/EditProfileScreen";

export type MainStackParamList = {
    BottomNavigation: undefined;
    StockInfo: { ticker?: string; companyName?: string };
    AddTransaction: { name?: string; shortName?: string; img?: any; logoUrl?: string | null; id?: number } | undefined;
    TransactionHistory: undefined;
    Settings: undefined;
    CompanyInfo: { name: string; shortName: string; img?: any; logoUrl?: string | null; id?: number };
    MyPortfolio: undefined;
    EditProfile: undefined;
};

const MainNavigation = () => {
    const Stack = createNativeStackNavigator<MainStackParamList>();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
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
            <Stack.Screen 
                name="CompanyInfo" 
                component={CompanyInfoScreen}
                options={{ title: 'Company Info' }}
            />
            <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigation;