import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/stackNavigation/AuthNavigation";
import theme from "../constants/colors";
import GradientBtn from "../components/GradientBtn";
import LottieView from "lottie-react-native";
import { fontSizes } from "../utils/fontSizes";

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}><Text style={[styles.title, {color: theme.accent.magenta, fontWeight: 900}]}>Delphix</Text> - simple & reliable</Text>
            
            <LottieView 
                    source={require('../assets/lottie/Growth.json')} 
                    autoPlay 
                    style={{ width: '100%', height: '30%'}}
                    loop
                />

            <View style={{alignItems: 'center', marginTop: 70}}>
                
                
                <Text style={styles.subtitle}>AI-powered forecasts
                    - get real-time predictions for your investments
                    - make informed decisions with confidence
                    - stay ahead of the market
                </Text>
            </View>
            
            
            <GradientBtn stylesContainer={{alignSelf: 'center', position: 'absolute', bottom:50}} text="Next" onPress={() => navigation.replace('Registration')} />   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        paddingHorizontal: 20,
        flexDirection: 'column',
        // justifyContent: 'center',
    
        // justifyContent: 'space-around',
        backgroundColor: theme.background.primary,
        // justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: fontSizes.h1,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    subtitle: {
        fontSize: fontSizes.body,
        // marginBottom: 20,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    

});

export default WelcomeScreen;