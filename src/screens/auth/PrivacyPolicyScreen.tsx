import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import { fontSizes, spacing } from "../../utils/fontSizes";
import BackSvg from "../../assets/svg/BackSvg";

type PrivacyPolicyScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'PrivacyPolicy'>;

const PrivacyPolicyScreen = () => {
    const navigation = useNavigation<PrivacyPolicyScreenNavigationProp>();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackSvg width={24} height={24} color={theme.accent.magenta} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>

                <Text style={styles.intro}>
                    At Delphix, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
                </Text>

                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.subsectionTitle}>Personal Information</Text>
                <Text style={styles.paragraph}>
                    We may collect personal information that you voluntarily provide to us when you register for an account, including:
                </Text>
                <Text style={styles.bulletPoint}>• Name and email address</Text>
                <Text style={styles.bulletPoint}>• Account credentials (password, which is encrypted)</Text>
                <Text style={styles.bulletPoint}>• Profile information you choose to provide</Text>

                <Text style={styles.subsectionTitle}>Financial Information</Text>
                <Text style={styles.paragraph}>
                    To provide investment tracking and forecasting services, we may collect:
                </Text>
                <Text style={styles.bulletPoint}>• Investment portfolio data</Text>
                <Text style={styles.bulletPoint}>• Transaction history</Text>
                <Text style={styles.bulletPoint}>• Financial preferences and risk tolerance</Text>

                <Text style={styles.subsectionTitle}>Usage Data</Text>
                <Text style={styles.paragraph}>
                    We automatically collect certain information when you use our App, including:
                </Text>
                <Text style={styles.bulletPoint}>• Device information (model, operating system)</Text>
                <Text style={styles.bulletPoint}>• Usage patterns and preferences</Text>
                <Text style={styles.bulletPoint}>• App performance data</Text>

                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.paragraph}>
                    We use the information we collect to:
                </Text>
                <Text style={styles.bulletPoint}>• Provide, maintain, and improve our services</Text>
                <Text style={styles.bulletPoint}>• Generate AI-powered investment forecasts</Text>
                <Text style={styles.bulletPoint}>• Process transactions and send related information</Text>
                <Text style={styles.bulletPoint}>• Send you technical notices and support messages</Text>
                <Text style={styles.bulletPoint}>• Respond to your comments and questions</Text>
                <Text style={styles.bulletPoint}>• Monitor and analyze trends and usage</Text>

                <Text style={styles.sectionTitle}>3. Data Security</Text>
                <Text style={styles.paragraph}>
                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
                </Text>

                <Text style={styles.sectionTitle}>4. Data Sharing and Disclosure</Text>
                <Text style={styles.paragraph}>
                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </Text>
                <Text style={styles.bulletPoint}>• With your explicit consent</Text>
                <Text style={styles.bulletPoint}>• To comply with legal obligations</Text>
                <Text style={styles.bulletPoint}>• To protect our rights and safety</Text>
                <Text style={styles.bulletPoint}>• With service providers who assist us in operating our App (under strict confidentiality agreements)</Text>

                <Text style={styles.sectionTitle}>5. AI and Machine Learning</Text>
                <Text style={styles.paragraph}>
                    Our App uses artificial intelligence and machine learning to provide investment forecasts. Your data may be used to train and improve our AI models, but we take measures to anonymize and aggregate data used for this purpose.
                </Text>

                <Text style={styles.sectionTitle}>6. Your Rights</Text>
                <Text style={styles.paragraph}>
                    You have the right to:
                </Text>
                <Text style={styles.bulletPoint}>• Access your personal information</Text>
                <Text style={styles.bulletPoint}>• Correct inaccurate data</Text>
                <Text style={styles.bulletPoint}>• Request deletion of your data</Text>
                <Text style={styles.bulletPoint}>• Object to processing of your data</Text>
                <Text style={styles.bulletPoint}>• Data portability</Text>
                <Text style={styles.paragraph}>
                    To exercise these rights, please contact us at privacy@delphix.com
                </Text>

                <Text style={styles.sectionTitle}>7. Cookies and Tracking Technologies</Text>
                <Text style={styles.paragraph}>
                    We may use cookies and similar tracking technologies to track activity on our App and store certain information. You can instruct your device to refuse all cookies or to indicate when a cookie is being sent.
                </Text>

                <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
                <Text style={styles.paragraph}>
                    Our App is not intended for children under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </Text>

                <Text style={styles.sectionTitle}>9. Changes to This Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </Text>

                <Text style={styles.sectionTitle}>10. International Data Transfers</Text>
                <Text style={styles.paragraph}>
                    Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our App, you consent to the transfer of your information to these facilities.
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </Text>
                    <Text style={styles.contactInfo}>Email: privacy@delphix.com</Text>
                    <Text style={styles.contactInfo}>Support: support@delphix.com</Text>
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
        marginBottom: spacing.verticalLg,
    },
    intro: {
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        lineHeight: 24,
        marginBottom: spacing.verticalXl,
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: fontSizes.h4,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: 'bold',
        marginTop: spacing.verticalXl,
        marginBottom: spacing.verticalMd,
    },
    subsectionTitle: {
        fontSize: fontSizes.h5,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        fontWeight: '600',
        marginTop: spacing.verticalMd,
        marginBottom: spacing.verticalSm,
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
        marginBottom: spacing.verticalSm,
    },
    contactInfo: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        lineHeight: 20,
        marginTop: spacing.verticalXs,
    },
});

export default PrivacyPolicyScreen;

