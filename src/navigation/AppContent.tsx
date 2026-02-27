import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import AuthNavigation from "./stackNavigation/AuthNavigation";
import MainNavigation from "./stackNavigation/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import theme from "../constants/colors";

const AppContent = () => {
    const { user, isLoading } = useContext(AuthContext);
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background.primary }}>
                <ActivityIndicator size="large" color={theme.accent.magenta} />
            </View>
        );
    }
    
    return (
        <NavigationContainer>
            {user ? <MainNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
};

export default AppContent;