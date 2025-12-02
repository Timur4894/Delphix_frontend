import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "../../components/Header";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import GradientBtn from "../../components/GradientBtn";

type CompanyInfoScreenRouteProp = RouteProp<MainStackParamList, 'CompanyInfo'>;
type CompanyInfoScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const CompanyInfoScreen = () => {
    const route = useRoute<CompanyInfoScreenRouteProp>();
    const navigation = useNavigation<CompanyInfoScreenNavigationProp>();
    const { name, shortName, img } = route.params;

    // Mock data - в реальном приложении это будет приходить с API
    const stockData = {
        currentPrice: 124.50,
        change: 2.35,
        changePercent: 1.92,
        marketCap: "2.8T",
        volume: "45.2M",
        high52w: 182.94,
        low52w: 124.17,
        pe: 28.5,
        dividend: 0.24,
    };

    const stats = [
        { label: "Market Cap", value: `$${stockData.marketCap}` },
        { label: "Volume", value: stockData.volume },
        { label: "52W High", value: `$${stockData.high52w}` },
        { label: "52W Low", value: `$${stockData.low52w}` },
        { label: "P/E Ratio", value: stockData.pe.toString() },
        { label: "Dividend", value: `${stockData.dividend}%` },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Header title={name} />

            <View style={styles.content}>
                {/* Company Header */}
                <View style={styles.companyHeader}>
                    <Image source={img} style={styles.companyLogo} resizeMode="contain" />
                    <View style={styles.companyInfo}>
                        <Text style={styles.companyName}>{name}</Text>
                        <Text style={styles.ticker}>{shortName}</Text>
                    </View>
                </View>

                {/* Price Card */}
                <ImageBackground
                    source={require('../../assets/img/gradientBG2.jpg')}
                    style={styles.priceCard}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="stretch"
                >
                    <View style={styles.priceContent}>
                        <Text style={styles.priceLabel}>Current Price</Text>
                        <Text style={styles.priceValue}>${stockData.currentPrice.toFixed(2)}</Text>
                        <View style={styles.changeContainer}>
                            <Text style={[
                                styles.changeText,
                                stockData.change >= 0 ? styles.changePositive : styles.changeNegative
                            ]}>
                                {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} 
                                ({stockData.change >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                {/* Stats Grid */}
                <Text style={styles.sectionTitle}>Key Metrics</Text>
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.buyButton]}
                        onPress={() => navigation.navigate('AddTransaction', { 
                            name, 
                            shortName, 
                            img 
                        })}
                    >
                        <Text style={styles.actionButtonText}>Add transaction</Text>
                    </TouchableOpacity>
                 
                </View>

                {/* About Section */}
                <Text style={styles.sectionTitle}>About {name}</Text>
                <View style={styles.aboutCard}>
                    <Text style={styles.aboutText}>
                        {name} Inc. is a leading technology company that designs, develops, and sells consumer electronics, 
                        computer software, and online services. The company is known for its innovative products and services 
                        that have revolutionized the technology industry.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
    },
    content: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
    },
    companyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xxl,
        backgroundColor: '#fff',
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
    },
    companyLogo: {
        width: sizes.logoLarge,
        height: sizes.logoLarge,
        borderRadius: 99,
        marginRight: spacing.lg,
    },
    companyInfo: {
        flex: 1,
    },
    companyName: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    ticker: {
        fontSize: fontSizes.body,
        color: '#000',
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    priceCard: {
        width: '100%',
        borderRadius: sizes.cardBorderRadius,
        minHeight: spacing.verticalXxl * 8,
        overflow: 'hidden',
        marginBottom: spacing.xxl,
    },
    priceContent: {
        padding: spacing.xxl,
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: fontSizes.body,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.md,
    },
    priceValue: {
        fontSize: fontSizes.xlarge,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    changeContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: sizes.cardBorderRadius,
    },
    changeText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: '#fff',
    },
    changePositive: {
        color: '#4AD39A',
    },
    changeNegative: {
        color: '#FF6B6B',
    },
    sectionTitle: {
        fontSize: fontSizes.h5,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    statCard: {
        width: '48%',
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
    },
    statLabel: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.sm,
    },
    statValue: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    actionButton: {
        flex: 1,
        paddingVertical: spacing.lg,
        borderRadius: sizes.cardBorderRadius,
        alignItems: 'center',
    },
    buyButton: {
        backgroundColor: theme.accent.magenta,
    },
    sellButton: {
        backgroundColor: theme.background.secondary,
        borderWidth: 2,
        borderColor: theme.accent.magenta,
    },
    actionButtonText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    aboutCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
        marginBottom: spacing.xxl,
    },
    aboutText: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        lineHeight: fontSizes.bodySmall * 1.4,
    },
});

export default CompanyInfoScreen;