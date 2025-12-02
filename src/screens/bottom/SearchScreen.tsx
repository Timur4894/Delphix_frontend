import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import StockItem from "../../components/StockItem";

type SearchScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const SearchScreen = () => {
    const navigation = useNavigation<SearchScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");

    // Mock data - в реальном приложении это будет приходить с API
    const topStocks = [
        { name: "Apple", shortName: "AAPL", img: require('../../assets/img/appleLogo.png'), price: 175.50, change: 2.35, changePercent: 1.35 },
        { name: "Tesla", shortName: "TSLA", img: require('../../assets/img/logo.jpg'), price: 245.30, change: -5.20, changePercent: -2.08 },
        { name: "Microsoft", shortName: "MSFT", img: require('../../assets/img/appleLogo.png'), price: 380.25, change: 8.50, changePercent: 2.29 },
        { name: "Google", shortName: "GOOGL", img: require('../../assets/img/appleLogo.png'), price: 135.50, change: 1.20, changePercent: 0.89 },
    ];

    const allStocks = [
        { name: "Apple", shortName: "AAPL", img: require('../../assets/img/appleLogo.png'), price: 175.50, change: 2.35, changePercent: 1.35 },
        { name: "Tesla", shortName: "TSLA", img: require('../../assets/img/logo.jpg'), price: 245.30, change: -5.20, changePercent: -2.08 },
        { name: "Microsoft", shortName: "MSFT", img: require('../../assets/img/appleLogo.png'), price: 380.25, change: 8.50, changePercent: 2.29 },
        { name: "Google", shortName: "GOOGL", img: require('../../assets/img/appleLogo.png'), price: 135.50, change: 1.20, changePercent: 0.89 },
        { name: "Amazon", shortName: "AMZN", img: require('../../assets/img/appleLogo.png'), price: 145.80, change: 3.40, changePercent: 2.39 },
        { name: "Meta", shortName: "META", img: require('../../assets/img/appleLogo.png'), price: 320.15, change: -2.10, changePercent: -0.65 },
        { name: "Nvidia", shortName: "NVDA", img: require('../../assets/img/appleLogo.png'), price: 485.20, change: 12.50, changePercent: 2.64 },
        { name: "Netflix", shortName: "NFLX", img: require('../../assets/img/appleLogo.png'), price: 420.80, change: -3.20, changePercent: -0.76 },
    ];

    // Рекомендованные акции (показываются когда нет поискового запроса)
    const recommendedStocks = [
        { name: "Apple", shortName: "AAPL", img: require('../../assets/img/appleLogo.png'), price: 175.50, change: 2.35, changePercent: 1.35 },
        { name: "Microsoft", shortName: "MSFT", img: require('../../assets/img/appleLogo.png'), price: 380.25, change: 8.50, changePercent: 2.29 },
        { name: "Google", shortName: "GOOGL", img: require('../../assets/img/appleLogo.png'), price: 135.50, change: 1.20, changePercent: 0.89 },
        { name: "Amazon", shortName: "AMZN", img: require('../../assets/img/appleLogo.png'), price: 145.80, change: 3.40, changePercent: 2.39 },
        { name: "Nvidia", shortName: "NVDA", img: require('../../assets/img/appleLogo.png'), price: 485.20, change: 12.50, changePercent: 2.64 },
        { name: "Meta", shortName: "META", img: require('../../assets/img/appleLogo.png'), price: 320.15, change: -2.10, changePercent: -0.65 },
    ];

    const filteredStocks = searchQuery
        ? allStocks.filter(stock =>
            stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stock.shortName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Определяем какие акции показывать
    const displayStocks = searchQuery.length > 0 ? filteredStocks : recommendedStocks;

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Top Stocks Section */}
            <View style={styles.topStocksSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Stocks</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topStocksScroll}>
                    {topStocks.map((stock, index) => (
                        <StockItem
                            key={index}
                            img={stock.img}
                            name={stock.name}
                            shortName={stock.shortName}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Search Section */}
            <View style={styles.searchSection}>
                <Text style={styles.searchTitle}>Search Stocks</Text>
                <View style={styles.searchInputContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by name or ticker (e.g., TSLA, AAPL)"
                        placeholderTextColor={theme.text.placeholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="characters"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery("")} style={styles.clearButton}>
                            <Text style={styles.clearButtonText}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

                <View style={styles.resultsSection}>
                    <Text style={styles.resultsTitle}>
                        {searchQuery.length > 0
                            ? filteredStocks.length > 0
                                ? `Found ${filteredStocks.length} result${filteredStocks.length > 1 ? 's' : ''}`
                                : 'No results found'
                            : 'Recommended Stocks'}
                    </Text>
                    
                    {displayStocks.length > 0 ? (
                        displayStocks.map((stock, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.resultCard}
                                onPress={() => navigation.navigate('CompanyInfo', {
                                    name: stock.name,
                                    shortName: stock.shortName,
                                    img: stock.img,
                                })}
                            >
                                <View style={styles.resultLeft}>
                                    <Image source={stock.img} style={styles.resultLogo} resizeMode="contain" />
                                    <View style={styles.resultInfo}>
                                        <Text style={styles.resultName}>{stock.name}</Text>
                                        <Text style={styles.resultTicker}>{stock.shortName}</Text>
                                    </View>
                                </View>
                                <View style={styles.resultRight}>
                                    <Text style={styles.resultPrice}>${stock.price.toFixed(2)}</Text>
                                    <Text style={[
                                        styles.resultChange,
                                        stock.change >= 0 ? styles.changePositive : styles.changeNegative
                                    ]}>
                                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔍</Text>
                            <Text style={styles.emptyText}>No stocks found</Text>
                            <Text style={styles.emptySubtext}>Try searching with a different term</Text>
                        </View>
                    )}
                </View>
   

         
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
        paddingTop: spacing.verticalXxl * 3 + spacing.verticalMd,
    },
    topStocksSection: {
        marginBottom: spacing.xxxl,
    },
    sectionHeader: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    topStocksScroll: {
    },
    searchSection: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xxl,
    },
    searchTitle: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background.tertiary,
        borderRadius: sizes.cardBorderRadius,
        paddingHorizontal: sizes.cardPadding,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    searchIcon: {
        fontSize: fontSizes.h4,
        marginRight: spacing.md,
    },
    searchInput: {
        flex: 1,
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        paddingVertical: spacing.lg,
    },
    clearButton: {
        padding: spacing.xs,
    },
    clearButtonText: {
        fontSize: fontSizes.body,
        color: theme.text.muted,
    },
    resultsSection: {
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.verticalXxl * 4,
    },
    resultsTitle: {
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    resultCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        marginBottom: spacing.md,
    },
    resultLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    resultLogo: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
        marginRight: spacing.md,
    },
    resultInfo: {
        flex: 1,
    },
    resultName: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    resultTicker: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    resultRight: {
        alignItems: 'flex-end',
    },
    resultPrice: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    resultChange: {
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    changePositive: {
        color: '#4AD39A',
    },
    changeNegative: {
        color: '#FF6B6B',
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing.verticalXxl * 3,
    },
    emptyIcon: {
        fontSize: sizes.iconXlarge * 1.5,
        marginBottom: spacing.lg,
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
    popularSection: {
        paddingHorizontal: spacing.xl,
    },
    popularTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginTop: spacing.lg,
    },
    tag: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    tagText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default SearchScreen;