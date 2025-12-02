import React, { useContext } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import EditSvg from "../../assets/svg/EditSvg";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import { AuthContext } from "../../context/AuthContext";


const ProfileScreen = ({navigation}: {navigation: NativeStackNavigationProp<MainStackParamList>}) => {
    const { logout } = useContext(AuthContext);
    
    const stats = [
        { label: "AI forecasts", value: "$128,450" },
        { label: "Risk profile", value: "Stable"  },
        { label: "Expected yearly return", value: "+10.2%" },
    ];

    const accountInfo = [
        { label: "Country", value: "Ukraine" },
        { label: "Email", value: "tymur.latush@gmail.com" },
        { label: "Name", value: "Tymur Latush" },
        { label: "Phone", value: "+380991234567" },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <ImageBackground
                source={require('../../assets/img/profile.jpeg')}
                imageStyle={{ borderRadius: 30 }}
                style={styles.header}
            >
                 <View style={styles.headerOverlay}>
                    <Text style={styles.title}>Tymur Latush</Text>
                    <Text style={styles.email}>tymur.latush@gmail.com</Text>
                    {/* <View style={styles.badge}>
                        <Text style={styles.badgeText}>Premium plan</Text>
                    </View> */}
                </View>
                
            </ImageBackground>

            <View style={styles.contentWrapper}>
                <View style={styles.card}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.cardTitle}>Net worth</Text>
                            <Text style={styles.cardValue}>$214,230.50</Text>
                        </View>
                    </View>
                </View>

                

              

                <Text style={styles.sectionTitle}>Account details</Text>
                <View style={styles.listCard}>
                    {accountInfo.map((item, idx) => (
                        <View key={item.label} style={[styles.listRow, idx !== accountInfo.length - 1 && styles.listDivider]}>
                            <Text style={styles.listLabel}>{item.label}</Text>
                            <Text style={styles.listValue}>{item.value}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Sign out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginBottom: 12, borderRadius: 20, paddingVertical: 16, alignItems: 'center'}}>
                    <Text style={{color: theme.accent.magenta, fontFamily: 'ZalandoSansExpanded-Italic', fontSize: fontSizes.body}}>Delete account</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginBottom: spacing.verticalXxl * 4}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
    },
    header: {
        width: '100%',
        height: spacing.verticalXxl * 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        padding: spacing.xxl,
        borderRadius: spacing.xxl,
        position: 'absolute',
        bottom: spacing.xxl,
        width: '85%',
        alignItems: 'center',
    },
    editBtn: {
        position: 'absolute',
        right: spacing.xl,
        top: spacing.verticalXxl * 3 + spacing.verticalMd,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: 99,
        padding: spacing.md,
    },
    title: {
        fontSize: fontSizes.h3,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        textAlign: 'center',
    },
    email: {
        fontSize: fontSizes.body,
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        textAlign: 'center',
    },
    badge: {
        marginTop: spacing.lg,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs + 2,
        borderRadius: 999,
        backgroundColor: theme.accent.magenta,
    },
    badgeText: {
        color: '#050505',
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontWeight: 'bold',
        fontSize: fontSizes.caption,
    },
    contentWrapper: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
        gap: spacing.xl,
    },
    card: {
        backgroundColor: theme.background.secondary,
        borderRadius: spacing.xxl,
        padding: spacing.xxl,
    },
    cardTitle: {
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.bodySmall,
    },
    cardValue: {
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        marginTop: spacing.sm,
    },
    cardSubtitle: {
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.caption,
        marginTop: spacing.lg,
    },
    pill: {
        backgroundColor: 'rgba(255, 62, 181, 0.2)',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.xs + 2,
        borderRadius: 999,
    },
    pillText: {
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.caption,
    },
    sectionTitle: {
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.h5,
        fontWeight: 'bold',
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    quickAction: {
        flex: 1,
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
    },
    quickActionTitle: {
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.body,
        marginBottom: spacing.xs + 2,
    },
    quickActionSubtitle: {
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.caption,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    statCard: {
        width: '48%',
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
        padding: sizes.cardPadding,
    },
    statLabel: {
        color: theme.text.muted,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.caption,
    },
    statValue: {
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.h4,
        marginTop: spacing.sm,
        marginBottom: spacing.xs + 2,
    },
    statDelta: {
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.caption,
    },
    listCard: {
        backgroundColor: theme.background.secondary,
        borderRadius: sizes.cardBorderRadius,
    },
    listRow: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listDivider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: theme.border.default,
    },
    listLabel: {
        color: theme.text.secondary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.bodySmall,
    },
    listValue: {
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.bodySmall,
    },
    logoutBtn: {
        marginTop: spacing.md,
        borderRadius: sizes.cardBorderRadius,
        borderWidth: 1,
        borderColor: theme.border.default,
        paddingVertical: spacing.lg,
        alignItems: 'center',
    },
    logoutText: {
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        fontSize: fontSizes.body,
    },
});

export default ProfileScreen;