import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../../screens/bottom/SearchScreen";
import ProfileScreen from "../../screens/bottom/ProfileScreen";
import PortfolioScreen from "../../screens/bottom/PortfolioScreen";
import AIForecastsScreen from "../../screens/bottom/AIForecastsScreen";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#999',
            }}
        >
            <Tab.Screen 
                name="Portfolio" 
                component={PortfolioScreen}
                options={{
                    tabBarLabel: 'Portfolio',
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                }}
            />
            <Tab.Screen 
                name="AIForecasts" 
                component={AIForecastsScreen}
                options={{
                    tabBarLabel: 'AI Forecasts',
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;