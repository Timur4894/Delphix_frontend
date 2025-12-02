import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing } from "../../utils/fontSizes";
import BackSvg from "../../assets/svg/BackSvg";

type TermsConditionsScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'TermsConditions'>;

const TermsConditionsScreen = () => {
    const navigation = useNavigation<TermsConditionsScreenNavigationProp>();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackSvg width={24} height={24} color={theme.accent.magenta} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Terms & Conditions</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.paragraph}>
                    By accessing and using the Delphix application ("App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </Text>

                <Text style={styles.sectionTitle}>2. Use License</Text>
                <Text style={styles.paragraph}>
                    Permission is granted to temporarily download one copy of the materials on Delphix's App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </Text>
                <Text style={styles.bulletPoint}>• modify or copy the materials</Text>
                <Text style={styles.bulletPoint}>• use the materials for any commercial purpose or for any public display</Text>
                <Text style={styles.bulletPoint}>• attempt to decompile or reverse engineer any software contained on Delphix's App</Text>
                <Text style={styles.bulletPoint}>• remove any copyright or other proprietary notations from the materials</Text>

                <Text style={styles.sectionTitle}>3. Investment Disclaimer</Text>
                <Text style={styles.paragraph}>
                    The information provided by Delphix, including AI-powered forecasts and investment recommendations, is for informational purposes only. It should not be considered as financial, investment, or trading advice. All investments carry risk, and you should consult with a qualified financial advisor before making any investment decisions.
                </Text>
                <Text style={styles.paragraph}>
                    Past performance does not guarantee future results. The value of investments can go down as well as up, and you may lose your entire investment.
                </Text>

                <Text style={styles.sectionTitle}>4. User Account</Text>
                <Text style={styles.paragraph}>
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password.
                </Text>

                <Text style={styles.sectionTitle}>5. AI Forecasts</Text>
                <Text style={styles.paragraph}>
                    Delphix uses artificial intelligence to provide forecasts and predictions. These forecasts are based on historical data and algorithms, but they are not guaranteed to be accurate. You should not rely solely on AI forecasts when making investment decisions.
                </Text>

                <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    In no event shall Delphix or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Delphix's App, even if Delphix or a Delphix authorized representative has been notified orally or in writing of the possibility of such damage.
                </Text>

                <Text style={styles.sectionTitle}>7. Revisions and Errata</Text>
                <Text style={styles.paragraph}>
                    The materials appearing on Delphix's App could include technical, typographical, or photographic errors. Delphix does not warrant that any of the materials on its App are accurate, complete, or current. Delphix may make changes to the materials contained on its App at any time without notice.
                </Text>

                <Text style={styles.sectionTitle}>8. Modifications</Text>
                <Text style={styles.paragraph}>
                    Delphix may revise these terms of service for its App at any time without notice. By using this App you are agreeing to be bound by the then current version of these terms of service.
                </Text>

                <Text style={styles.sectionTitle}>9. Governing Law</Text>
                <Text style={styles.paragraph}>
                    These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in the jurisdiction where Delphix operates.
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        If you have any questions about these Terms & Conditions, please contact us at support@delphix.com
                    </Text>
                </View>
            </ScrollView>
        </View>
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
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.verticalXxl * 3 + spacing.verticalMd,
        paddingBottom: spacing.verticalLg,
    },
    headerTitle: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.verticalXxl * 2,
    },
    lastUpdated: {
        fontSize: fontSizes.caption,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.muted,
        marginBottom: spacing.verticalXl,
    },
    sectionTitle: {
        fontSize: fontSizes.h4,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: 'bold',
        marginTop: spacing.verticalXl,
        marginBottom: spacing.verticalMd,
    },
    paragraph: {
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
        lineHeight: 24,
        marginBottom: spacing.verticalMd,
    },
    bulletPoint: {
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
        lineHeight: 24,
        marginLeft: spacing.md,
        marginBottom: spacing.verticalSm,
    },
    footer: {
        marginTop: spacing.verticalXxl,
        paddingTop: spacing.verticalXl,
        borderTopWidth: 1,
        borderTopColor: theme.border.default,
    },
    footerText: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.muted,
        lineHeight: 20,
    },
});

export default TermsConditionsScreen;

