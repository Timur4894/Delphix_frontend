import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import Header from "../../components/Header";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";

type TransactionHistoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type TransactionType = 'all' | 'buy' | 'sell';

const TransactionHistoryScreen = () => {
    const navigation = useNavigation<TransactionHistoryScreenNavigationProp>();
    const [filter, setFilter] = useState<TransactionType>('all');

    // Mock data - в реальном приложении это будет приходить с API
    const transactions = [
        {
            id: 1,
            type: 'buy' as const,
            name: "Apple",
            shortName: "AAPL",
            img: require('../../assets/img/appleLogo.png'),
            quantity: 10,
            price: 175.50,
            total: 1755.00,
            date: "2024-01-15",
            time: "14:30",
            note: "Bought at market price",
        },
        {
            id: 2,
            type: 'sell' as const,
            name: "Tesla",
            shortName: "TSLA",
            img: require('../../assets/img/logo.jpg'),
            quantity: 5,
            price: 245.30,
            total: 1226.50,
            date: "2024-01-14",
            time: "10:15",
            note: "",
        },
        {
            id: 3,
            type: 'buy' as const,
            name: "Microsoft",
            shortName: "MSFT",
            img: require('../../assets/img/appleLogo.png'),
            quantity: 8,
            price: 380.25,
            total: 3042.00,
            date: "2024-01-13",
            time: "16:45",
            note: "Long term investment",
        },
        {
            id: 4,
            type: 'buy' as const,
            name: "Google",
            shortName: "GOOGL",
            img: require('../../assets/img/appleLogo.png'),
            quantity: 3,
            price: 135.50,
            total: 406.50,
            date: "2024-01-12",
            time: "09:20",
            note: "",
        },
        {
            id: 5,
            type: 'sell' as const,
            name: "Apple",
            shortName: "AAPL",
            img: require('../../assets/img/appleLogo.png'),
            quantity: 2,
            price: 178.00,
            total: 356.00,
            date: "2024-01-11",
            time: "11:30",
            note: "Profit taking",
        },
        {
            id: 6,
            type: 'buy' as const,
            name: "Tesla",
            shortName: "TSLA",
            img: require('../../assets/img/logo.jpg'),
            quantity: 3,
            price: 240.00,
            total: 720.00,
            date: "2024-01-10",
            time: "13:15",
            note: "",
        },
    ];

    const filteredTransactions = filter === 'all' 
        ? transactions 
        : transactions.filter(t => t.type === filter);

    const stats = {
        totalBuy: transactions.filter(t => t.type === 'buy').reduce((sum, t) => sum + t.total, 0),
        totalSell: transactions.filter(t => t.type === 'sell').reduce((sum, t) => sum + t.total, 0),
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

                {filteredTransactions.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No transactions found</Text>
                    </View>
                ) : (
                    filteredTransactions.map((transaction, index) => {
                        const showDateHeader = index === 0 || 
                            filteredTransactions[index - 1].date !== transaction.date;
                        
                        return (
                            <View key={transaction.id}>
                                {showDateHeader && (
                                    <Text style={styles.dateHeader}>
                                        {formatDate(transaction.date)}
                                    </Text>
                                )}
                                <View
                                    style={styles.transactionCard}
                                   
                                >
                                    <View style={styles.transactionHeader}>
                                        <View style={styles.transactionLeft}>
                                            <Image source={transaction.img} style={styles.transactionLogo} resizeMode="contain" />
                                            <View style={styles.transactionInfo}>
                                                <Text style={styles.transactionName}>{transaction.name}</Text>
                                                <Text style={styles.transactionTicker}>{transaction.shortName}</Text>
                                            </View>
                                        </View>
                                        <View style={[
                                            styles.typeBadge,
                                            transaction.type === 'buy' ? styles.typeBadgeBuy : styles.typeBadgeSell
                                        ]}>
                                            <Text style={styles.typeBadgeText}>
                                                {transaction.type === 'buy' ? 'Buy' : 'Sell'}
                                            </Text>
                                        </View>
                                    </View>
                                    
                                    <View style={styles.transactionDetails}>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Quantity:</Text>
                                            <Text style={styles.detailValue}>{transaction.quantity} shares</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Price:</Text>
                                            <Text style={styles.detailValue}>${transaction.price.toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Total:</Text>
                                            <Text style={styles.detailValueTotal}>${transaction.total.toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Time:</Text>
                                            <Text style={styles.detailValue}>{transaction.time}</Text>
                                        </View>
                                        {transaction.note && (
                                            <View style={styles.noteContainer}>
                                                <Text style={styles.noteText}>📝 {transaction.note}</Text>
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