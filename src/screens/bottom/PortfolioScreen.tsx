import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";

type PortfolioScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const PortfolioScreen = () => {
    const navigation = useNavigation<PortfolioScreenNavigationProp>();

    return (
        <View>
            <Text>Portfolio</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
                <Text>Add Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
                <Text>Transaction History</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PortfolioScreen;