import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import StockItem from "../../components/StockItem";
import { searchCompaniesApi, getTopCompaniesApi } from "../../api/companyApi";
import { getCompanyImage } from "../../utils/companyImage";

type SearchScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface Company {
    id: number;
    name: string;
    ticker: string;
    logo?: string;
    logo_url?: string;
    current_price?: number;
    price_change?: number;
    price_change_percent?: number;
}

const SearchScreen = () => {
    const navigation = useNavigation<SearchScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = useState("");
    const [topStocks, setTopStocks] = useState<Company[]>([]);
    const [searchResults, setSearchResults] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchLoading, setSearchLoading] = useState(false);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

   
    useEffect(() => {
        const loadTopCompanies = async () => {
            try {
                setLoading(true);
                const response = await getTopCompaniesApi();
                // API возвращает { data: [...], pagination: {...} }
                const companies = response.data || response || [];
                setTopStocks(companies);
            } catch (error) {
                console.error('Error loading top companies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTopCompanies();
    }, []);

    // Поиск с debounce
    useEffect(() => {
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (searchQuery.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        if (searchQuery.trim().length < 2) {
            return;
        }

        searchTimeoutRef.current = setTimeout(async () => {
            try {
                setSearchLoading(true);
                const response = await searchCompaniesApi(searchQuery.trim(), 1, 10);
                // API возвращает { data: [...], pagination: {...} }
                const companies = response.data || response || [];
                setSearchResults(companies);
            } catch (error) {
                console.error('Error searching companies:', error);
                setSearchResults([]);
            } finally {
                setSearchLoading(false);
            }
        }, 500); // Debounce 500ms

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [searchQuery]);

    // Преобразуем данные компании для отображения
    const formatCompanyForDisplay = (company: Company) => {
        return {
            id: company.id,
            name: company.name,
            shortName: company.ticker,
            img: getCompanyImage(company.logo_url || company.logo),
            logoUrl: company.logo_url || company.logo,
            price: company.current_price !== undefined && company.current_price !== null ? Number(company.current_price) : undefined,
            change: company.price_change !== undefined && company.price_change !== null ? Number(company.price_change) : undefined,
            changePercent: company.price_change_percent !== undefined && company.price_change_percent !== null ? Number(company.price_change_percent) : undefined,
        };
    };

    const displayStocks = searchResults.map(formatCompanyForDisplay)

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Top Stocks Section */}
            <View style={styles.topStocksSection}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Top Stocks</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topStocksScroll}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color={theme.accent.magenta} />
                        </View>
                    ) : (
                        topStocks.map((stock) => {
                            const formatted = formatCompanyForDisplay(stock);
                            return (
                                <StockItem
                                    key={stock.id}
                                    stockData={stock}
                                    onPress={() => navigation.navigate('CompanyInfo', {stock})}
                                />
                            );
                        })
                    )}
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
                        {
                             searchLoading
                                ? 'Searching...'
                                : searchResults.length > 0
                                    ? `Found ${searchResults.length} result${searchResults.length > 1 ? 's' : ''}`
                                    : 'No results found'
                        }
                    </Text>
                    
                    {searchLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={theme.accent.magenta} />
                            <Text style={styles.loadingText}>Searching...</Text>
                        </View>
                    ) : displayStocks.length > 0 ? (
                        displayStocks.map((stock) => (
                            <TouchableOpacity
                                key={stock.id}
                                style={styles.resultCard}
                                onPress={() => navigation.navigate('CompanyInfo', {stock})}
                            >
                                <View style={styles.resultLeft}>
                                    <View style={styles.resultInfo}>
                                        <Text style={styles.resultName}>{stock.name}</Text>
                                        <Text style={styles.resultTicker}>{stock.shortName}</Text>
                                    </View>
                                     
                                </View>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyIcon}>🔍</Text>
                            <Text style={styles.emptyText}>No stocks found</Text>
                            <Text style={styles.emptySubtext}>
                                {searchQuery.length > 0 
                                    ? 'Try searching with a different term' 
                                    : 'Loading companies...'}
                            </Text>
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
    loadingContainer: {
        padding: spacing.xxl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: spacing.md,
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default SearchScreen;