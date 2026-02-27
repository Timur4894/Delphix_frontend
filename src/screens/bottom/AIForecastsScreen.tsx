import React, { useCallback, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator, Linking } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import { getAllNewsApi } from "../../api/newsApi";

type AIForecastsScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const AIForecastsScreen = () => {
    const navigation = useNavigation<AIForecastsScreenNavigationProp>();
    const [portfolioNewsLoading, setPortfolioNewsLoading] = useState(true);
    const [portfolioNews, setPortfolioNews] = useState<any[]>([]);

    const loadPortfolioNews = useCallback(async () => {
        try {
            setPortfolioNewsLoading(true);
            const res = await getAllNewsApi();
     
            const items = Array.isArray(res) ? res : (res?.items || res?.data || []);
            setPortfolioNews(Array.isArray(items) ? items : []);
        } catch (error) {
            console.error('Error loading portfolio news:', error);
            setPortfolioNews([]);
        } finally {
            setPortfolioNewsLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadPortfolioNews();
        }, [loadPortfolioNews])
    );

    const formatFinnhubDatetime = (dt: any) => {
        const seconds = Number(dt);
        if (!Number.isFinite(seconds) || seconds <= 0) return '';
        const date = new Date(seconds * 1000);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    // Mock data - персональные рекомендации на основе портфеля
    const personalRecommendations = [
        {
            id: 1,
            type: 'buy',
            stock: { name: "Apple", shortName: "AAPL", img: require('../../assets/img/appleLogo.png') },
            reason: "Based on your portfolio and recent news about Apple's new product launch, AI recommends increasing your position.",
            confidence: 85,
            timeframe: "1-3 months",
        },
        {
            id: 2,
            type: 'hold',
            stock: { name: "Tesla", shortName: "TSLA", img: require('../../assets/img/logo.jpg') },
            reason: "Your Tesla holdings are performing well. AI suggests holding current position as market volatility is expected.",
            confidence: 72,
            timeframe: "2-4 weeks",
        },
        {
            id: 3,
            type: 'sell',
            stock: { name: "Microsoft", shortName: "MSFT", img: require('../../assets/img/appleLogo.png') },
            reason: "Recent regulatory concerns may impact short-term performance. Consider taking partial profits.",
            confidence: 68,
            timeframe: "1-2 weeks",
        },
    ];

    // Mock data - общие рекомендации по новостям
    const marketNews = [

    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Warning Banner */}
            <View style={styles.warningBanner}>
                <Text style={styles.warningIcon}>⚠️</Text>
                <Text style={styles.warningText}>
                    This is NOT investment advice. These are AI-generated forecasts that may not come true. Always do your own research.
                </Text>
            </View>

            <View style={styles.content}>
                {/* Header */}
        
                {/* Portfolio News */}
                <Text style={styles.sectionTitle}>Portfolio News</Text>
                <Text style={styles.sectionDescription}>
                    Latest headlines from your portfolio (last 3 days)
                </Text>

                {portfolioNewsLoading ? (
                    <View style={styles.loadingInline}>
                        <ActivityIndicator size="small" color={theme.accent.magenta} />
                    </View>
                ) : portfolioNews.length === 0 ? (
                    <View style={styles.emptyInline}>
                        <Text style={styles.emptyInlineText}>No news found</Text>
                    </View>
                ) : (
                    portfolioNews.slice(0, 6).map((item, id) => (
                        <TouchableOpacity
                            key={id}
                            style={styles.portfolioNewsItem}
                            onPress={() => {
                                const url = item?.url;
                                if (typeof url === 'string' && url.startsWith('http')) {
                                    Linking.openURL(url);
                                }
                            }}
                            activeOpacity={0.85}
                        >
                            <View style={styles.portfolioNewsHeader}>
                                <Text style={styles.portfolioNewsTicker}>
                                    {item?.ticker || item?.related || '—'}
                                </Text>
                                <Text style={styles.portfolioNewsDate}>
                                    {formatFinnhubDatetime(item?.datetime)}
                                </Text>
                            </View>
                            <Text style={styles.portfolioNewsTitle} numberOfLines={2}>
                                {item?.headline || item?.title || 'Untitled'}
                            </Text>
                            {(item?.source || item?.category) && (
                                <Text style={styles.portfolioNewsMeta} numberOfLines={1}>
                                    {item?.source || item?.category}
                                </Text>
                            )}
                        </TouchableOpacity>
                    ))
                )}

                {/* Personal Recommendations */}
                <Text style={styles.sectionTitle}>Personal Recommendations</Text>
                <Text style={styles.sectionDescription}>
                    AI analysis based on your current portfolio and latest market news
                </Text>

                {personalRecommendations.map((rec, id) => (
                    <TouchableOpacity
                        key={id}
                        style={styles.recommendationCard}
                        onPress={() => navigation.navigate('CompanyInfo', {
                            name: rec.stock.name,
                            shortName: rec.stock.shortName,
                            img: rec.stock.img,
                        })}
                    >
                        <View style={styles.recommendationHeader}>
                            <View style={styles.recommendationLeft}>
                                {/* <Image source={rec.stock.img} style={styles.stockLogo} resizeMode="contain" /> */}
                                <View style={styles.stockInfo}>
                                    <Text style={styles.stockName}>{rec.stock.name}</Text>
                                    <Text style={styles.stockTicker}>{rec.stock.shortName}</Text>
                                </View>
                            </View>
                            <View style={[
                                styles.recommendationBadge,
                                rec.type === 'buy' ? styles.buyBadge :
                                rec.type === 'sell' ? styles.sellBadge : styles.holdBadge
                            ]}>
                                <Text style={styles.recommendationBadgeText}>
                                    {rec.type.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.recommendationReason}>{rec.reason}</Text>
                        <View style={styles.recommendationFooter}>
                            <View style={styles.confidenceContainer}>
                                <Text style={styles.confidenceLabel}>Confidence:</Text>
                                <Text style={styles.confidenceValue}>{rec.confidence}%</Text>
                            </View>
                            <Text style={styles.timeframe}>Timeframe: {rec.timeframe}</Text>
                        </View>
                    </TouchableOpacity>
                ))}


                
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
    },
    warningBanner: {
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        borderRadius: sizes.cardBorderRadius,
        marginHorizontal: spacing.xl,
        paddingHorizontal: spacing.xl,
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 0)',
        paddingVertical: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.verticalXxl * 3 + spacing.verticalMd,
    },
    warningIcon: {
        fontSize: fontSizes.h3,
        marginRight: spacing.md,
    },
    warningText: {
        flex: 1,
        fontSize: fontSizes.bodySmall,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'ZalandoSansExpanded-Italic',
        lineHeight: fontSizes.bodySmall * 1.4,
    },
    content: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.verticalXxl * 4,
        paddingTop: spacing.xxl,
    },
    headerTitle: {
        fontSize: fontSizes.h1,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.sm,
    },
    headerSubtitle: {
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xxxl,
    },
    sectionTitle: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginTop: spacing.xxl,
        marginBottom: spacing.sm,
    },
    sectionDescription: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    loadingInline: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyInline: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyInlineText: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    portfolioNewsItem: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
        marginBottom: spacing.md,
    },
    portfolioNewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    portfolioNewsTicker: {
        fontSize: fontSizes.caption,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontWeight: '700',
    },
    portfolioNewsDate: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    portfolioNewsTitle: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    portfolioNewsMeta: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    recommendationCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
        marginBottom: spacing.lg,
    },
    recommendationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    recommendationLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    stockLogo: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
        marginRight: spacing.md,
    },
    stockInfo: {
        flex: 1,
    },
    stockName: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    stockTicker: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    recommendationBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs + 2,
        borderRadius: sizes.cardBorderRadius,
    },
    buyBadge: {
        backgroundColor: 'rgba(74, 211, 154, 0.2)',
    },
    sellBadge: {
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
    },
    holdBadge: {
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
    },
    recommendationBadgeText: {
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    recommendationReason: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        lineHeight: fontSizes.bodySmall * 1.4,
        marginBottom: spacing.md,
    },
    recommendationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.border.default,
    },
    confidenceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    confidenceLabel: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginRight: spacing.sm,
    },
    confidenceValue: {
        fontSize: fontSizes.bodySmall,
        fontWeight: 'bold',
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    timeframe: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    newsCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
        marginBottom: spacing.lg,
    },
    newsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    newsTitle: {
        flex: 1,
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginRight: spacing.md,
    },
    impactBadge: {
        paddingHorizontal: spacing.sm + 2,
        paddingVertical: spacing.xs,
        borderRadius: spacing.md,
    },
    positiveBadge: {
        backgroundColor: 'rgba(74, 211, 154, 0.2)',
    },
    negativeBadge: {
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
    },
    neutralBadge: {
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
    },
    impactBadgeText: {
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    newsDescription: {
        fontSize: fontSizes.bodySmall,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        lineHeight: fontSizes.bodySmall * 1.4,
        marginBottom: spacing.md,
    },
    newsFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.border.default,
    },
    affectedStocks: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    affectedLabel: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginRight: spacing.sm,
    },
    affectedStocksText: {
        fontSize: fontSizes.caption,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontWeight: '600',
    },
    newsDate: {
        fontSize: fontSizes.caption,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default AIForecastsScreen;
