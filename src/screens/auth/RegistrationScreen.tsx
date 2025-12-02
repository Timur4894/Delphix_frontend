import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import GradientBtn from "../../components/GradientBtn";
import { fontSizes } from "../../utils/fontSizes";
import { signupApi } from "../../api/authApi";
import { AuthContext } from "../../context/AuthContext";
import ProfileSvg from "../../assets/svg/ProfileSvg";
import MailSvg from "../../assets/svg/MailSvg";
import LockSvg from "../../assets/svg/LockSvg";
import EyeClosedSvg from "../../assets/svg/EyeClosedSvg";
import EyeOpenSvg from "../../assets/svg/EyeOpenSvg";

type RegistrationScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Registration'>;

const RegistrationScreen = () => {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const { login } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        if (!agreeToTerms) {
            Alert.alert("Error", "Please agree to the Terms & Conditions");
            return;
        }

        setLoading(true);
        try {
            const response = await signupApi(email, password, name);
            if (response.access_token) {
                // Сохраняем токен и профиль пользователя в контекст
                // response может содержать user или мы используем данные из response
                const userData = response.user || { email, user_name: name, id: response.id };
                await login(userData, response.access_token);
                // Navigation will be handled by AppContent based on token
            }
        } catch (error: any) {
            Alert.alert(
                "Registration Failed", 
                error.response?.data?.message || error.message || "An error occurred during registration"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} > 
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>
                    <Text style={styles.logoTextAccent}>Delphix</Text>
                </Text>
            </View>

            <Text style={styles.mainTitle}>Create your account</Text>
            <Text style={styles.subtitle}>Sign up to start investing and get AI-powered forecasts</Text>

            <View style={styles.inputContainer}>
                <ProfileSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Name"
                    placeholderTextColor={theme.text.placeholder}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            </View>

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

            {/* Password Input */}
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

            <View style={styles.inputContainer}>
                <LockSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Your Password"
                    placeholderTextColor={theme.text.placeholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeClosedSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/> : <EyeOpenSvg width={24} height={24} color={theme.accent.magenta} style={{marginRight: 12}}/>}
                </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
                <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                    <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                        {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <View style={styles.termsTextContainer}>
                        <Text style={styles.termsText}>
                            I agree to the{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('TermsConditions')}>
                            <Text style={styles.termsLink}>Terms & Conditions</Text>
                        </TouchableOpacity>
                        <Text style={styles.termsText}>
                            {' '}and{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <GradientBtn 
                text={loading ? "Signing up..." : "Sign Up"} 
                onPress={loading ? () => {} : handleSignup}
            />
            {loading && (
                <ActivityIndicator 
                    size="small" 
                    color={theme.accent.magenta} 
                    style={{ marginTop: 10 }} 
                />
            )}

         
            

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInLink}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        backgroundColor: theme.background.primary,
        paddingHorizontal: 20,
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
    termsContainer: {
        marginBottom: 25,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: theme.accent.magenta,
        marginRight: 8,
        marginTop: 2,
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
    termsTextContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    termsText: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
        lineHeight: 20,
    },
    termsLink: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        lineHeight: 20,
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
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signInText: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    signInLink: {
        fontSize: fontSizes.bodySmall,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: '600',
    },
});

export default RegistrationScreen;