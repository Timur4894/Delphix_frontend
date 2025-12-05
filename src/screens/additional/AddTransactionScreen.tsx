import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import GradientBtn from "../../components/GradientBtn";
import SelectableStockItem from "../../components/SelectableStockItem";
import BackSvg from "../../assets/svg/BackSvg";
import Header from "../../components/Header";
import { getCompanyImage } from "../../utils/companyImage";
import { searchCompaniesApi } from "../../api/companyApi";

type AddTransactionScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'AddTransaction'>;
type AddTransactionScreenRouteProp = RouteProp<MainStackParamList, 'AddTransaction'>;

const AddTransactionScreen = () => {
    const navigation = useNavigation<AddTransactionScreenNavigationProp>();
    const route = useRoute<AddTransactionScreenRouteProp>();
    const [transactionType, setTransactionType] = useState<'buy' | 'sell'>('buy');
    const [selectedStock, setSelectedStock] = useState<{name: string, shortName: string, img: any, logoUrl?: string | null} | null>(null);
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [note, setNote] = useState("");

    // Устанавливаем выбранную компанию из параметров навигации и загружаем актуальную цену
    useEffect(() => {
        const loadCompanyData = async () => {
            if (route.params?.name && route.params?.shortName) {
                const imageSource = route.params.logoUrl 
                    ? getCompanyImage(route.params.logoUrl) 
                    : (route.params.img || getCompanyImage());
                
                const stockFromParams = {
                    name: route.params.name,
                    shortName: route.params.shortName,
                    img: imageSource,
                    logoUrl: route.params.logoUrl,
                };
                setSelectedStock(stockFromParams);

                // Загружаем актуальную цену компании
                try {
                    const searchResult = await searchCompaniesApi(route.params.shortName, 1, 1);
                    const companies = searchResult.data || searchResult || [];
                    const company = companies.find((c: any) => c.ticker === route.params.shortName) || companies[0];
                    
                    if (company && company.current_price) {
                        // Автозаполняем цену актуальной ценой из API
                        setPrice(company.current_price.toString());
                    }
                } catch (error) {
                    console.error('Error loading company price:', error);
                }
            }
        };

        loadCompanyData();
    }, [route.params]);

    const handleSubmit = () => {
        // TODO: Implement transaction submission
        console.log({
            type: transactionType,
            stock: selectedStock,
            quantity,
            price,
            note,
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Header title="Add Transaction" />

            <View>
                {/* Transaction Type Selection */}
                <Text style={styles.sectionTitle}>Transaction Type</Text>
                <View style={styles.typeContainer}>
                    <TouchableOpacity
                        style={[styles.typeButton, transactionType === 'buy' && styles.typeButtonActive]}
                        onPress={() => setTransactionType('buy')}
                    >
                        <Text style={[styles.typeButtonText, transactionType === 'buy' && styles.typeButtonTextActive]}>
                            Buy
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.typeButton, transactionType === 'sell' && styles.typeButtonActive]}
                        onPress={() => setTransactionType('sell')}
                    >
                        <Text style={[styles.typeButtonText, transactionType === 'sell' && styles.typeButtonTextActive]}>
                            Sell
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Select Company</Text>
                {selectedStock ? (
                    <View style={styles.stocksContainer}>
                        <SelectableStockItem 
                            logoUrl={selectedStock.logoUrl}
                            name={selectedStock.name}
                            shortName={selectedStock.shortName}
                            isSelected={true}
                            onPress={() => {}}
                        />
                    </View>
                ) : (
                    <View style={styles.stocksContainer}>
                        <Text style={styles.noCompanyText}>No company selected</Text>
                    </View>
                )}

                <Text style={styles.sectionTitle}>Quantity</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>📊</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter quantity"
                        placeholderTextColor={theme.text.placeholder}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                    />
                </View>

                {/* Price Input */}
                <Text style={styles.sectionTitle}>Price per Share</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputIcon}>💰</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter price per share"
                        placeholderTextColor={theme.text.placeholder}
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="decimal-pad"
                    />
                </View>

                {/* Total Calculation */}
                {quantity && price && (
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalValue}>
                            ${(parseFloat(quantity) * parseFloat(price)).toFixed(2)}
                        </Text>
                    </View>
                )}

                {/* Note Input */}
                <Text style={styles.sectionTitle}>Note (Optional)</Text>
                <View style={[styles.inputContainer, styles.noteContainer]}>
                    <TextInput
                        style={[styles.input, styles.noteInput]}
                        placeholder="Add a note about this transaction"
                        placeholderTextColor={theme.text.placeholder}
                        value={note}
                        onChangeText={setNote}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                {/* Submit Button */}
                <GradientBtn
                    text={transactionType === 'buy' ? 'Buy Shares' : 'Sell Shares'}
                    onPress={handleSubmit}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 20,
    },
    backButton: {
        fontSize: fontSizes.body,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    headerTitle: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    sectionTitle: {
        paddingHorizontal: spacing.xl,
        fontSize: fontSizes.h5,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginTop: spacing.xxl,
        marginBottom: spacing.md,
    },
    typeContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.sm,
        paddingHorizontal: spacing.xl,
    },
    typeButton: {
        flex: 1,
        paddingVertical: spacing.lg,
        borderRadius: sizes.cardBorderRadius,
        backgroundColor: theme.background.secondary,
        borderWidth: 2,
        borderColor: theme.border.default,
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: theme.accent.magenta,
        borderColor: theme.accent.magenta,
    },
    typeButtonText: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    typeButtonTextActive: {
        color: theme.text.primary,
    },
    stocksContainer: {
        marginBottom: spacing.sm,
        paddingHorizontal: 16
    },
    stockCard: {
        marginRight: spacing.md,
        backgroundColor: theme.background.secondary,
        borderWidth: 2,
        borderColor: theme.border.default,
        width: sizes.logoLarge + spacing.xxxl,
        height: sizes.logoLarge + spacing.xxxl * 2,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    stockCardSelected: {
        borderColor: theme.accent.magenta,
        backgroundColor: 'rgba(255, 62, 181, 0.1)',
    },
    stockImage: {
        width: sizes.logoMedium,
        height: sizes.logoMedium,
        borderRadius: 99,
    },
    stockName: {
        fontSize: fontSizes.body,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    stockShortName: {
        fontSize: fontSizes.caption,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background.tertiary,
        borderRadius: sizes.cardBorderRadius,
        marginHorizontal: spacing.xl,
        paddingHorizontal: spacing.lg - 1,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    inputIcon: {
        fontSize: fontSizes.h4,
        marginRight: spacing.sm + 2,
    },
    input: {
        flex: 1,
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        paddingVertical: spacing.lg - 1,
    },
    noteContainer: {
        alignItems: 'flex-start',
        minHeight: spacing.verticalXxl * 5,
        marginBottom: spacing.xl,
    },
    noteInput: {
        paddingTop: spacing.lg - 1,
        minHeight: spacing.verticalXxl * 4,
    },
    totalContainer: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPaddingLarge,
        marginBottom: spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    totalValue: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    noCompanyText: {
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        textAlign: 'center',
        padding: spacing.xl,
    },
});

export default AddTransactionScreen;