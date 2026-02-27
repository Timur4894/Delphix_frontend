import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import Header from "../../components/Header";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import { getAllMyTransactionsApi } from "../../api/transactionApi";
import { getCompanyImage } from "../../utils/companyImage";

type TransactionHistoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type TransactionType = 'all' | 'buy' | 'sell';

const TransactionHistoryScreen = () => {
    const [filter, setFilter] = useState<TransactionType>('all');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadTransactions = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getAllMyTransactionsApi();
            const items = Array.isArray(data) ? data : (data?.data || []);
            setTransactions(items);
        } catch (error) {
            console.error('Error loading transactions:', error);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadTransactions();
        }, [loadTransactions])
    );

    const filteredTransactions = filter === 'all'
        ? transactions
        : transactions.filter(t => String(t.type).toUpperCase() === filter.toUpperCase());

    const stats = {
        totalBuy: transactions
            .filter(t => String(t.type).toUpperCase() === 'BUY')
            .reduce((sum, t) => sum + Number(t.total_cost || 0), 0),
        totalSell: transactions
            .filter(t => String(t.type).toUpperCase() === 'SELL')
            .reduce((sum, t) => sum + Number(t.total_cost || 0), 0),
        totalTransactions: transactions.length,
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Header title="Transaction History" />

            <View style={styles.content}>
                {/* Stats Cards */}
                
                {/* Filter Buttons */}
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={[styles.filterButtonText, filter === 'all' && styles.filterButtonTextActive]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'buy' && styles.filterButtonActive]}
                        onPress={() => setFilter('buy')}
                    >
                        <Text style={[styles.filterButtonText, filter === 'buy' && styles.filterButtonTextActive]}>
                            Buy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'sell' && styles.filterButtonActive]}
                        onPress={() => setFilter('sell')}
                    >
                        <Text style={[styles.filterButtonText, filter === 'sell' && styles.filterButtonTextActive]}>
                            Sell
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Transactions List */}
                <Text style={styles.sectionTitle}>
                    {filter === 'all' ? 'All Transactions' : filter === 'buy' ? 'Buy Transactions' : 'Sell Transactions'}
                </Text>

                {loading ? (
                    <View style={styles.emptyContainer}>
                        <ActivityIndicator size="large" color={theme.accent.magenta} />
                    </View>
                ) : filteredTransactions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No transactions found</Text>
                    </View>
                ) : (
                    filteredTransactions.map((transaction, index) => {
                        const txDate = transaction.date ? new Date(transaction.date) : new Date();
                        const dateKey = txDate.toISOString().slice(0, 10);
                        const prev = filteredTransactions[index - 1];
                        const prevKey = prev?.date ? new Date(prev.date).toISOString().slice(0, 10) : null;
                        const showDateHeader = index === 0 || prevKey !== dateKey;
                        const companyName = transaction.company?.name || transaction.company_ticker || 'Unknown';
                        const ticker = transaction.company?.ticker || transaction.company_ticker || 'N/A';
                        const logoUrl = transaction.company?.logo_url || null;
                        const qty = Number(transaction.quantity || 0);
                        const total = Number(transaction.total_cost || 0);
                        const pps = qty > 0 ? total / qty : 0;
                        const type = String(transaction.type).toUpperCase() === 'BUY' ? 'buy' : 'sell';
                        
                        return (
                            <View key={transaction.id}>
                                {showDateHeader && (
                                    <Text style={styles.dateHeader}>
                                        {formatDate(dateKey)}
                                    </Text>
                                )}
                                <View
                                    style={styles.transactionCard}
                                   
                                >
                                    <View style={styles.transactionHeader}>
                                        <View style={styles.transactionLeft}>
                                            {/* <Image source={getCompanyImage(logoUrl)} style={styles.transactionLogo} resizeMode="contain" /> */}
                                            <View style={styles.transactionInfo}>
                                                <Text style={styles.transactionName}>{companyName}</Text>
                                                <Text style={styles.transactionTicker}>{ticker}</Text>
                                            </View>
                                        </View>
                                        <View style={[
                                            styles.typeBadge,
                                            type === 'buy' ? styles.typeBadgeBuy : styles.typeBadgeSell
                                        ]}>
                                            <Text style={styles.typeBadgeText}>
                                                {type === 'buy' ? 'Buy' : 'Sell'}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.transactionDetails}>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Quantity:</Text>
                                            <Text style={styles.detailValue}>{qty} shares</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Price:</Text>
                                            <Text style={styles.detailValue}>${pps.toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Total:</Text>
                                            <Text style={styles.detailValueTotal}>${total.toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Time:</Text>
                                            <Text style={styles.detailValue}>
                                                {txDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </Text>
                                        </View>
                                        {transaction.notes && (
                                            <View style={styles.noteContainer}>
                                                <Text style={styles.noteText}>📝 {transaction.notes}</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        );
                    })
                )}

               
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
    statsContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        alignItems: 'center',
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
    filterContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xxl,
    },
    filterButton: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: sizes.cardBorderRadius,
        backgroundColor: theme.background.secondary,
        borderWidth: 2,
        borderColor: theme.border.default,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: theme.accent.magenta,
        borderColor: theme.accent.magenta,
    },
    filterButtonText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    filterButtonTextActive: {
        color: theme.text.primary,
    },
    sectionTitle: {
        fontSize: fontSizes.h5,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.lg,
    },
    dateHeader: {
        fontSize: fontSizes.bodySmall,
        fontWeight: 'bold',
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginTop: spacing.xl,
        marginBottom: spacing.sm,
        marginLeft: spacing.xs,
    },
    transactionCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        marginBottom: spacing.md,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    transactionLogo: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
        marginRight: spacing.md,
    },
    transactionInfo: {
        flex: 1,
    },
    transactionName: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginBottom: spacing.xs,
    },
    transactionTicker: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    typeBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs + 2,
        borderRadius: sizes.cardBorderRadius,
    },
    typeBadgeBuy: {
        backgroundColor: 'rgba(74, 211, 154, 0.2)',
    },
    typeBadgeSell: {
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
    },
    typeBadgeText: {
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    transactionDetails: {
        borderTopWidth: 1,
        borderTopColor: theme.border.default,
        paddingTop: spacing.md,
        gap: spacing.sm,
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
    detailValueTotal: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    noteContainer: {
        marginTop: spacing.sm,
        padding: spacing.sm,
        backgroundColor: theme.background.tertiary,
        borderRadius: spacing.md,
    },
    noteText: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    emptyContainer: {
        padding: spacing.xl * 2,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: fontSizes.body,
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    addButton: {
        marginTop: spacing.xxl,
        paddingVertical: spacing.lg,
        borderRadius: sizes.cardBorderRadius,
        backgroundColor: theme.accent.magenta,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
});

export default TransactionHistoryScreen;