import { View, Image, Text, TouchableOpacity, StyleSheet} from "react-native";
import { fontSizes, spacing, sizes } from "../utils/fontSizes";
import theme from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../navigation/stackNavigation/MainNavigation";

type StockItemNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const StockItem = ({img, name, shortName, onPress}: {img: any, name: string, shortName: string, onPress?: () => void}) => {
    const navigation = useNavigation<StockItemNavigationProp>();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.navigate('CompanyInfo', { name, shortName, img });
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={img} style={styles.image} resizeMode="contain"/>
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.shortName}>{shortName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: spacing.xl,
        backgroundColor: '#fff',
        width: sizes.logoLarge + spacing.xxxl * 2,
        height: sizes.logoLarge + spacing.xxxl * 3,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    nameContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    image: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
    },
    name: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    shortName: {
        fontSize: fontSizes.caption,
        color: 'gray',
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default StockItem;