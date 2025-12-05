import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { fontSizes, spacing, sizes } from "../utils/fontSizes";
import theme from "../constants/colors";
import { getCompanyImage } from "../utils/companyImage";

interface SelectableStockItemProps {
    img?: any;
    logoUrl?: string | null;
    name: string;
    shortName: string;
    isSelected: boolean;
    onPress: () => void;
}

const SelectableStockItem = ({ img, logoUrl, name, shortName, isSelected, onPress }: SelectableStockItemProps) => {
    // Используем logoUrl если есть, иначе img, иначе дефолтное изображение
    const imageSource = logoUrl ? getCompanyImage(logoUrl) : (img || getCompanyImage());
    
    return (
        <TouchableOpacity 
            style={[
                styles.container, 
                isSelected && styles.containerSelected
            ]} 
            onPress={onPress}
        >
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
            <View style={styles.nameContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.shortName}>{shortName}</Text>
            </View>
            {isSelected && (
                <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        // marginLeft: spacing.xl,
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderWidth: 2,
        borderColor: theme.border.default,
        position: 'relative',
    },
    containerSelected: {
        borderColor: theme.accent.magenta,
        backgroundColor: 'rgba(255, 62, 181, 0.1)',
    },
    image: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
    },
    nameContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    shortName: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    checkmark: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.accent.magenta,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: theme.text.primary,
        fontSize: fontSizes.bodySmall,
        fontWeight: 'bold',
    },
});

export default SelectableStockItem;

