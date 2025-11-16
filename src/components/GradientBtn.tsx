import { StyleSheet, TouchableOpacity, Text } from "react-native";
import theme from "../constants/colors";

const GradientBtn = ({ text, onPress, stylesContainer }: { text: string, onPress: () => void, stylesContainer?: StyleProp<ViewStyle>}) => {
    return (
        <TouchableOpacity style={[styles.button, stylesContainer]} onPress={onPress}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.accent.magenta,
        padding: 16,
        width: '80%',
        alignItems: 'center',
        borderRadius: 20,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 22,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
});

export default GradientBtn;