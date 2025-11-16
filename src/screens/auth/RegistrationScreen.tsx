import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import GradientBtn from "../../components/GradientBtn";

type RegistrationScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Registration'>;

const RegistrationScreen = () => {
    const navigation = useNavigation<RegistrationScreenNavigationProp>();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    return (
        <View style={styles.container} >
           

            {/* Logo and Title */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>
                    <Text style={styles.logoTextAccent}>Delphix</Text>
                </Text>
            </View>

            {/* Main Title */}
            <Text style={styles.mainTitle}>Create your account</Text>
            <Text style={styles.subtitle}>Sign up to start investing and get AI-powered forecasts</Text>

            {/* Name Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Name"
                    placeholderTextColor={theme.text.placeholder}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>✉️</Text>
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
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Password"
                    placeholderTextColor={theme.text.placeholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Your Password"
                    placeholderTextColor={theme.text.placeholder}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
            </View>

            {/* Terms and Conditions */}
            <View style={styles.termsContainer}>
                <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                    <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                        {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.termsText}>
                        I agree to the <Text style={styles.termsLink}>Terms & Conditions</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <GradientBtn 
                text="Sign Up" 
                onPress={() => {
                    // TODO: Implement registration logic
                    console.log('Registration:', { name, email, password, confirmPassword, agreeToTerms });
                }} 
            />

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or Continue With</Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialIcon}>G</Text>
                    <Text style={styles.socialText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialIcon}>🍎</Text>
                    <Text style={styles.socialText}>Apple</Text>
                </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.signInLink}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backIcon: {
        fontSize: 24,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        fontSize: 60,
        marginBottom: 10,
    },
    logoText: {
        fontSize: 32,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    logoTextAccent: {
        color: theme.accent.magenta,
        fontWeight: '900',
    },
    mainTitle: {
        fontSize: 28,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
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
        fontSize: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        paddingVertical: 15,
    },
    eyeIcon: {
        fontSize: 20,
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    termsText: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
        lineHeight: 20,
    },
    termsLink: {
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
        fontSize: 14,
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
        fontSize: 20,
        marginRight: 8,
        color: theme.text.primary,
    },
    socialText: {
        fontSize: 16,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    signInLink: {
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: '600',
    },
});

export default RegistrationScreen;