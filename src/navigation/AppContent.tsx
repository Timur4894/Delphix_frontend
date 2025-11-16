import AuthNavigation from "./stackNavigation/AuthNavigation";
import MainNavigation from "./stackNavigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";

const AppContent = () => {
    const isLoggedIn = false;
    return (
        <NavigationContainer>
            {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
};

export default AppContent;