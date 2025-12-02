import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import BackSvg from "../assets/svg/BackSvg";
import theme from "../constants/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/stackNavigation/MainNavigation";
import { fontSizes, spacing, sizes } from "../utils/fontSizes";
import { useNavigation } from "@react-navigation/native";

type HeaderNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Header = ({title}: {title: string}) => {
    const navigation = useNavigation<HeaderNavigationProp>();

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackSvg width={24} height={24} color={theme.accent.magenta} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}</Text>
            <View style={{ width: 60 }} />
        </View>
    );  
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.verticalXxl * 3 + spacing.verticalMd,
    },
    headerTitle: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});
export default Header;  