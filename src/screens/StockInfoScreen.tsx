import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../navigation/stackNavigation/MainNavigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type StockInfoScreenRouteProp = RouteProp<MainStackParamList, 'StockInfo'>;
type StockInfoScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const StockInfoScreen = () => {
    const route = useRoute<StockInfoScreenRouteProp>();
    const navigation = useNavigation<StockInfoScreenNavigationProp>();
    const { ticker } = route.params || {};

    return (
        <View>
            <Text>Stock Info: {ticker || 'N/A'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
                <Text>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
                <Text>Sell</Text>
            </TouchableOpacity>
        </View>
    );
};

export default StockInfoScreen;