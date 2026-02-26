import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import Header from "../../components/Header";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import { getCompanyImage } from "../../utils/companyImage";
import { getCompanyByTickerApi } from "../../api/companyApi";

type CompanyInfoScreenRouteProp = RouteProp<MainStackParamList, 'CompanyInfo'>;
type CompanyInfoScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const CompanyInfoScreen = () => {
  const route = useRoute<CompanyInfoScreenRouteProp>();
  const navigation = useNavigation<CompanyInfoScreenNavigationProp>();
  const { stock } = route.params;

  const [companyData, setCompanyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Объединяем данные: сначала stock, потом API
  const mergedData = {
    ...(stock || {}),
    ...(companyData || {}),
  } as any;

  const shortName = mergedData.ticker || mergedData.shortName || '';
  const name = mergedData.name || mergedData.companyName || '';
  const logoUrl = mergedData.logoUrl || mergedData.logo_url || mergedData.logo || null;
  const imageSource = logoUrl ? getCompanyImage(logoUrl) : getCompanyImage();

  // Загружаем данные компании через тикер
  useEffect(() => {
    const loadCompanyData = async () => {
      if (!shortName) return setLoading(false);

      try {
        setLoading(true);
        const data = await getCompanyByTickerApi(shortName);
        if (data) setCompanyData(data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [shortName]);

  // Считаем цену и изменение
  const currentPrice = mergedData.current_price ?? mergedData.price ?? 0;
  const priceChange = mergedData.price_change ?? mergedData.change ?? 0;
  const priceChangePercent = mergedData.price_change_percent ?? mergedData.changePercent ?? 0;

  const stats = [
    { label: "Ticker", value: shortName },
    { label: "Current Price", value: currentPrice > 0 ? `$${currentPrice.toFixed(2)}` : "N/A" },
    { label: "Price Change", value: priceChange !== 0 ? `${priceChange >= 0 ? '+' : ''}$${priceChange.toFixed(2)}` : "N/A" },
    { label: "Change %", value: priceChangePercent !== 0 ? `${priceChangePercent >= 0 ? '+' : ''}${priceChangePercent.toFixed(2)}%` : "N/A" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Header title={name || shortName} />

      <View style={styles.content}>
        {/* Company Header */}
        <View style={styles.companyHeader}>
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
            {loading ? (
              <ActivityIndicator size="large" color="#fff" style={{ marginVertical: spacing.lg }} />
            ) : currentPrice > 0 ? (
              <>
                <Text style={styles.priceValue}>${currentPrice.toFixed(2)}</Text>
                {(priceChange !== 0 || priceChangePercent !== 0) && (
                  <View style={styles.changeContainer}>
                    <Text style={[
                      styles.changeText,
                      priceChange >= 0 ? styles.changePositive : styles.changeNegative
                    ]}>
                      {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <Text style={styles.priceValue}>Price not available</Text>
            )}
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
              img: imageSource,
              logoUrl 
            })}
          >
            <Text style={styles.actionButtonText}>Add transaction</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        {companyData?.description && (
          <>
            <Text style={styles.sectionTitle}>About {name}</Text>
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>{companyData.description}</Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background.primary },
  content: { paddingHorizontal: spacing.xl, paddingTop: spacing.xl },
  companyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xxl, backgroundColor: '#fff', borderRadius: sizes.cardBorderRadius, padding: sizes.cardPaddingLarge },
  companyInfo: { flex: 1 },
  companyName: { fontSize: fontSizes.h3, fontWeight: 'bold', color: '#000', fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: spacing.xs },
  ticker: { fontSize: fontSizes.body, color: '#000', fontFamily: 'ZalandoSansExpanded-Italic' },
  priceCard: { width: '100%', borderRadius: sizes.cardBorderRadius, minHeight: spacing.verticalXxl * 8, overflow: 'hidden', marginBottom: spacing.xxl },
  priceContent: { padding: spacing.xxl, alignItems: 'center' },
  priceLabel: { fontSize: fontSizes.body, color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: spacing.md },
  priceValue: { fontSize: fontSizes.xlarge, fontWeight: 'bold', color: '#fff', fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: spacing.lg },
  changeContainer: { backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: sizes.cardBorderRadius },
  changeText: { fontSize: fontSizes.body, fontWeight: 'bold', fontFamily: 'ZalandoSansExpanded-Italic', color: '#fff' },
  changePositive: { color: '#4AD39A' },
  changeNegative: { color: '#FF6B6B' },
  sectionTitle: { fontSize: fontSizes.h5, fontWeight: 'bold', color: theme.text.primary, fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: spacing.lg },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xxl },
  statCard: { width: '48%', backgroundColor: theme.background.secondary, borderRadius: sizes.cardBorderRadius, padding: sizes.cardPadding },
  statLabel: { fontSize: fontSizes.caption, color: theme.text.muted, fontFamily: 'ZalandoSansExpanded-Italic', marginBottom: spacing.sm },
  statValue: { fontSize: fontSizes.h4, fontWeight: 'bold', color: theme.accent.magenta, fontFamily: 'ZalandoSansExpanded-Italic' },
  actionsContainer: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.xxl },
  actionButton: { flex: 1, paddingVertical: spacing.lg, borderRadius: sizes.cardBorderRadius, alignItems: 'center' },
  buyButton: { backgroundColor: theme.accent.magenta },
  actionButtonText: { fontSize: fontSizes.body, fontWeight: 'bold', color: theme.text.primary, fontFamily: 'ZalandoSansExpanded-Italic' },
  aboutCard: { backgroundColor: theme.background.secondary, borderRadius: sizes.cardBorderRadius, padding: sizes.cardPaddingLarge, marginBottom: spacing.xxl },
  aboutText: { fontSize: fontSizes.bodySmall, color: theme.text.secondary, fontFamily: 'ZalandoSansExpanded-Italic', lineHeight: fontSizes.bodySmall * 1.4 },
});

export default CompanyInfoScreen;