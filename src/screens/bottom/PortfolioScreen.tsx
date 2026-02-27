import React, { useState, useCallback, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import Header from "../../components/Header";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import GradientBtn from "../../components/GradientBtn";
import { getMyPortfolioApi, deleteHoldingByTickerApi } from "../../api/portfolioApi";
import { getCompanyImage } from "../../utils/companyImage";
import { AuthContext } from "../../context/AuthContext";

type MyPortfolioScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const PortfolioScreen = () => {
    const navigation = useNavigation<MyPortfolioScreenNavigationProp>();
    const [portfolio, setPortfolio] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [portfolioData, setPortfolioData] = useState({
        totalValue: 0,
        totalChange: 0,
        totalChangePercent: 0,
        totalCost: 0,
        totalProfit: 0,
        totalProfitPercent: 0,
    });

    const loadPortfolio = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getMyPortfolioApi();
            const portfolioItems = Array.isArray(response) ? response : (response.data || []);
            console.log('PortfolioScreen: portfolioItems from API:', portfolioItems);
            setPortfolio(portfolioItems);

            const totalValue = portfolioItems.reduce(
                (sum: number, item: any) => sum + (item.current_value || 0),
                0
            );
            const totalCost = portfolioItems.reduce(
                (sum: number, item: any) => sum + (item.total_invested || 0),
                0
            );
            const totalProfit = totalValue - totalCost;
            const totalProfitPercent = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

            console.log('PortfolioScreen totals:', {
                totalValue,
                totalCost,
                totalProfit,
                totalProfitPercent,
            });

            setPortfolioData({
                totalValue,
                totalChange: totalProfit,
                totalChangePercent: totalProfitPercent,
                totalCost,
                totalProfit,
                totalProfitPercent,
            });
        } catch (error) {
            console.error('Error loading portfolio:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Рефетчим портфель каждый раз при возврате на экран
    useFocusEffect(
        useCallback(() => {
            loadPortfolio();
        }, [loadPortfolio])
    );

    // Форматируем данные портфеля для отображения
    const formatHolding = (item: any) => {
        return {
            id: item.id || item.company_id,
            name: item.company?.name || item.name || 'Unknown',
            shortName: item.company?.ticker || item.ticker || 'N/A',
            logoUrl: item.company?.logo_url || item.logo_url,
            quantity: item.shares || 0,
            avgPrice: item.avg_price || 0,
            currentPrice: item.current_price || 0,
            value: item.current_value || 0,
            profit: item.profit_loss || 0,
            profitPercent: item.profit_loss_percent || 0,
        };
    };

    const holdings = portfolio.map(formatHolding);

    const stats = [
        { label: "Total Cost", value: `$${portfolioData.totalCost.toFixed(2)}` },
        { label: "Total Profit", value: `$${portfolioData.totalProfit.toFixed(2)}` },
        { label: "Profit %", value: `+${portfolioData.totalProfitPercent.toFixed(2)}%` },
        { label: "Holdings", value: holdings.length.toString() },
    ];

    const handleRemoveHolding = (ticker: string) => {
        Alert.alert(
            'Remove holding',
            `Remove ${ticker} from your portfolio? This does not delete your transaction history.`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteHoldingByTickerApi(ticker);
                            await loadPortfolio();
                        } catch (error: any) {
                            console.error('Error removing holding:', error);
                            const message =
                                error?.response?.data?.message ||
                                error?.message ||
                                'Failed to remove holding';
                            Alert.alert('Error', String(message));
                        }
                    },
                },
            ],
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={{paddingHorizontal: 20,paddingTop: 80, fontSize: fontSizes.h4, fontWeight: 'bold', color: theme.text.primary, fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: 20}}>My Portfolio</Text>

            <View style={styles.content}>
                {/* Portfolio Summary Card */}
                <ImageBackground
                    source={require('../../assets/img/gradientBG2.jpg')}
                    style={styles.summaryCard}
                    imageStyle={{ borderRadius: 20 }}
                    resizeMode="stretch"
                >
                    <View style={styles.summaryContent}>
                        <Text style={styles.summaryLabel}>Total Portfolio Value</Text>
                        <Text style={styles.summaryValue}>${portfolioData.totalValue.toFixed(2)}</Text>
                        <View style={styles.changeRow}>
                            <Text style={[
                                styles.changeText,
                                portfolioData.totalChange >= 0 ? styles.profitPositive : styles.profitNegative
                            ]}>
                                {portfolioData.totalChange >= 0 ? '+' : ''}${portfolioData.totalChange.toFixed(2)} ({portfolioData.totalChangePercent >= 0 ? '+' : ''}{portfolioData.totalChangePercent.toFixed(2)}%)
                            </Text>
                            {/* <Text style={styles.timeText}>Overall Profit/Loss</Text> */}
                        </View>
                    </View>
                </ImageBackground>

                {/* Stats Grid */}
                <Text style={styles.sectionTitle}>Portfolio Stats</Text>
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                        </View>
                    ))}
                </View>

                {/* Holdings List */}
                <View style={styles.holdingsHeader}>
                    <Text style={styles.sectionTitle}>Holdings</Text>
                    <Text style={styles.holdingsCount}>{holdings.length} stocks</Text>
                </View>

                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.accent.magenta} />
                    </View>
                ) : holdings.length > 0 ? (
                    holdings.map((holding) => (
                        <View key={holding.id} style={styles.holdingCard}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('CompanyInfo', {
                                    name: holding.name,
                                    shortName: holding.shortName,
                                    logoUrl: holding.logoUrl,
                                    id: holding.id,
                                })}
                            >
                                <View style={styles.holdingHeader}>
                                    {/* <Image source={getCompanyImage(holding.logoUrl)} style={styles.holdingLogo} resizeMode="contain" /> */}
                                    <View style={styles.holdingInfo}>
                                        <Text style={styles.holdingName}>{holding.name}</Text>
                                        <Text style={styles.holdingTicker}>{holding.shortName}</Text>
                                    </View>
                                    <View style={styles.holdingPrice}>
                                        <Text style={styles.currentPrice}>${holding.currentPrice.toFixed(2)}</Text>
                                        <Text style={[
                                            styles.profitText,
                                            holding.profit >= 0 ? styles.profitPositive : styles.profitNegative
                                        ]}>
                                            {holding.profit >= 0 ? '+' : ''}${holding.profit.toFixed(2)} ({holding.profitPercent >= 0 ? '+' : ''}{holding.profitPercent.toFixed(2)}%)
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.holdingDetails}>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Quantity:</Text>
                                        <Text style={styles.detailValue}>{holding.quantity} shares</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Avg Price:</Text>
                                        <Text style={styles.detailValue}>${holding.avgPrice.toFixed(2)}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={styles.detailLabel}>Value:</Text>
                                        <Text style={styles.detailValue}>${holding.value.toFixed(2)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.holdingActions}>
                                <TouchableOpacity onPress={() => handleRemoveHolding(holding.shortName)}>
                                    <Text style={styles.removeHoldingText}>Remove from portfolio</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No holdings yet</Text>
                        <Text style={styles.emptySubtext}>Start investing to see your portfolio here</Text>
                    </View>
                )}

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.secondaryButton]}
                        onPress={() => navigation.navigate('TransactionHistory')}
                    >
                        <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>View History</Text>
                    </TouchableOpacity>
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
    summaryCard: {
        width: '100%',
        borderRadius: sizes.cardBorderRadius,
        minHeight: spacing.verticalXxl * 8,
        overflow: 'hidden',
        marginBottom: spacing.xxl,
    },
    summaryContent: {
        padding: spacing.xxl,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: fontSizes.body,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.md,
    },
    summaryValue: {
        fontSize: fontSizes.xlarge,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    changeText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: '#4AD39A',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: sizes.cardBorderRadius,
    },
    timeText: {
        fontSize: fontSizes.caption,
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'ZalandoSansExpanded-Italic',
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
        justifyContent: 'space-around',
    },
    statCard: {
        width: '45%',
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
    holdingsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    holdingsCount: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    holdingCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        marginBottom: spacing.md,
    },
    holdingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    holdingLogo: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
        marginRight: spacing.md,
    },
    holdingInfo: {
        flex: 1,
    },
    holdingName: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    holdingTicker: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    holdingPrice: {
        alignItems: 'flex-end',
    },
    currentPrice: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: 4,
    },
    profitText: {
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    profitPositive: {
        color: '#4AD39A',
    },
    profitNegative: {
        color: '#FF6B6B',
    },
    holdingDetails: {
        borderTopWidth: 1,
        borderTopColor: theme.border.default,
        paddingTop: spacing.md,
        gap: spacing.sm,
    },
    holdingActions: {
        marginTop: spacing.sm,
        alignItems: 'flex-end',
    },
    removeHoldingText: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        textDecorationLine: 'underline',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    detailValue: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontWeight: '600',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.xxl,
        marginBottom: spacing.verticalXxl * 4,
    },
    actionButton: {
        width: '100%',
        paddingVertical: spacing.lg,
        borderRadius: sizes.cardBorderRadius,
        backgroundColor: theme.accent.magenta,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
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
    secondaryButtonText: {
        color: theme.accent.magenta,
    },
    loadingContainer: {
        padding: spacing.xxl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing.verticalXxl * 3,
    },
    emptyText: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.sm,
    },
    emptySubtext: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default PortfolioScreen;

