import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";

type ProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const ProfileScreen = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text>Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;