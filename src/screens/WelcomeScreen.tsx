import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/stackNavigation/AuthNavigation";
import theme from "../constants/colors";
import GradientBtn from "../components/GradientBtn";

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}><Text style={[styles.title, {color: theme.accent.magenta, fontWeight: 900}]}>Delphix</Text> - simple & reliable</Text>
            
            <View>
                <Text style={styles.subtitle}>Earn with top brands
                    - buy shares with your
                    card and track your portfolio
                </Text>
                <Text style={styles.subtitle}>AI-powered forecasts
                    - get real-time predictions for your investments
                    - make informed decisions with confidence
                    - stay ahead of the market
                </Text>
            </View>
            
            
            <GradientBtn text="Next" onPress={() => navigation.replace('Registration')} />   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        backgroundColor: theme.background.primary,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 34,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    

});

export default WelcomeScreen;