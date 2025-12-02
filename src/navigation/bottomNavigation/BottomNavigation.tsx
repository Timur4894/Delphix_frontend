import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../../screens/bottom/SearchScreen";
import ProfileScreen from "../../screens/bottom/ProfileScreen";
import PortfolioScreen from "../../screens/bottom/PortfolioScreen";
import AIForecastsScreen from "../../screens/bottom/AIForecastsScreen";
import theme from "../../constants/colors";
import PortfolioSvg from "../../assets/svg/PortfolioSvg";
import SearchSvg from "../../assets/svg/SearchSvg";
import AISvg from "../../assets/svg/AISvg";
import ProfileSvg from "../../assets/svg/ProfileSvg";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.accent.magenta,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: theme.background.primary,
                    position: 'absolute',
                    bottom: 28,
                    width: '90%',
                    marginLeft: '5%',
                    paddingBottom: 20,
                    borderWidth: 1,
                    borderColor: theme.background.secondary,
                    paddingHorizontal: 20,
                    borderRadius: 30,
                    paddingTop: 20,
                },
                
                tabBarInactiveTintColor: '#999',
            }}
        >
            <Tab.Screen 
                name="Portfolio" 
                component={PortfolioScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <PortfolioSvg width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SearchSvg width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="AIForecasts" 
                component={AIForecastsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AISvg width={size} height={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ProfileSvg width={size} height={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;