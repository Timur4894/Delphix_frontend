import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";

type SearchScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const SearchScreen = () => {
    const navigation = useNavigation<SearchScreenNavigationProp>();

    return (
        <View>
            <Text>Search</Text>
            <TouchableOpacity onPress={() => navigation.navigate('StockInfo', { ticker: 'AAPL' })}>
                <Text>Go to Stock Info</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SearchScreen;