import React, { useContext, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import theme from "../../constants/colors";
import EditSvg from "../../assets/svg/EditSvg";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import { AuthContext } from "../../context/AuthContext";
import { getMyPortfolioApi } from "../../api/portfolioApi";


const ProfileScreen = ({navigation}: {navigation: NativeStackNavigationProp<MainStackParamList>}) => {
    const { logout, user } = useContext(AuthContext);
    const [portfolio, setPortfolio] = useState(null);
    const [portfolioLoading, setPortfolioLoading] = useState(true);

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };
    
    // useEffect(() => {
    //     const loadPortfolio = async () => {
    //         try {
    //             setPortfolioLoading(true);
    //             const portfolioData = await getMyPortfolioApi();
    //             setPortfolio(portfolioData);
                
    //         } catch (error) {
    //             console.error('Error loading portfolio:', error);
    //         } finally {
    //             setPortfolioLoading(false);
    //         }
    //     };

    //     if (user) {
    //         loadPortfolio();
    //     }
    // }, [user]);

    const accountInfo = [
        { label: "Email", value: user?.user.email || "N/A" },
        { label: "Name", value: user?.user.user_name || "N/A" },
        { label: "User ID", value: user?.user.id?.toString() || "N/A" },
    ];

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!user) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.accent.magenta} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <ImageBackground
                source={{uri: user?.user?.avatar}}
                imageStyle={{ borderRadius: 30 }}
                style={styles.header}
            >
                {!user?.user?.avatar && (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>{user?.user?.user_name?.charAt(0) || "U"}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
                    <EditSvg width={24} height={24} color={theme.text.primary} />
                </TouchableOpacity>
                 <View style={styles.headerOverlay}>
                    <Text style={styles.title}>{user?.user?.user_name || user?.user?.name || "User"}</Text>
                    <Text style={styles.email}>{user?.user?.email || "No email"}</Text>
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
                            
                                <Text style={styles.cardValue}>
                                    $0
                                </Text>
                    
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
        backgroundColor: theme.background.secondary,
        borderRadius: spacing.xxl,
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
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
       
        borderRadius: 99,
        padding: spacing.md,
    },
    avatarPlaceholderText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
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