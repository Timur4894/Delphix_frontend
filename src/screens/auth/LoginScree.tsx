import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import GradientBtn from "../../components/GradientBtn";
import { fontSizes } from "../../utils/fontSizes";
import { loginApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import MailSvg from "../../assets/svg/MailSvg";
import LockSvg from "../../assets/svg/LockSvg";
import EyeOpenSvg from "../../assets/svg/EyeOpenSvg";
import EyeClosedSvg from "../../assets/svg/EyeClosedSvg";

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await loginApi(email, password);
            if (response.access_token) {
                // Сохраняем токен и профиль пользователя в контекст
                // response может содержать user или мы используем данные из response
                const userData = response.user || { email, id: response.id };
                console.log('userData: ', userData);
                console.log('response.access_token: ', response.access_token);
                await login(userData, response.access_token);
                // Navigation will be handled by AppContent based on token
            }
        } catch (error: any) {
            Alert.alert(
                "Login Failed", 
                error.response?.data?.message || error.message || "An error occurred during login"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={styles.container} >
                        <View style={styles.logoContainer}>
                <Text style={styles.logoText}>
                    <Text style={styles.logoTextAccent}>Delphix</Text>
                </Text>
            </View>

            <Text style={styles.mainTitle}>Sign in to your account</Text>
            <Text style={styles.subtitle}>Welcome back! Select method to log in</Text>

            <View style={styles.inputContainer}>
                <MailSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Email"
                    placeholderTextColor={theme.text.placeholder}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <LockSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    placeholderTextColor={theme.text.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeClosedSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/> : <EyeOpenSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>}
                </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
                <TouchableOpacity>
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                </TouchableOpacity>
            </View>

            <GradientBtn 
                text={loading ? "Logging in..." : "Log In"} 
                onPress={loading ? () => {} : handleLogin}
            />
            {loading && (
                <ActivityIndicator 
                    size="small" 
                    color={theme.accent.magenta} 
                    style={{ marginTop: 10 }} 
                />
            )}

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 70,
        backgroundColor: theme.background.primary,
        // justifyContent: 'center',
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backIcon: {
        fontSize: fontSizes.h3,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        fontSize: fontSizes.xlarge,
        marginBottom: 10,
    },
    logoText: {
        fontSize: fontSizes.h2,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    logoTextAccent: {
        color: theme.accent.magenta,
        fontWeight: '900',
    },
    mainTitle: {
        fontSize: fontSizes.h2,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background.tertiary,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    inputIcon: {
        fontSize: fontSizes.h4,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        paddingVertical: 15,
    },
    eyeIcon: {
        fontSize: fontSizes.h4,
        marginLeft: 10,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 25,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: theme.accent.magenta,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: theme.accent.magenta,
    },
    checkmark: {
        color: theme.text.primary,
        fontSize: fontSizes.caption,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    forgetPassword: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: theme.border.default,
    },
    dividerText: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.muted,
        marginHorizontal: 15,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 15,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.background.secondary,
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    socialIcon: {
        fontSize: fontSizes.h4,
        marginRight: 8,
        color: theme.text.primary,
    },
    socialText: {
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    signUpLink: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: '600',
    },
});

export default LoginScreen;