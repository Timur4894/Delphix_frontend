import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/stackNavigation/AuthNavigation";
import theme from "../../constants/colors";
import GradientBtn from "../../components/GradientBtn";

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.container} >
            

            {/* Logo and Title */}
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>
                    <Text style={styles.logoTextAccent}>Delphix</Text>
                </Text>
            </View>

            {/* Main Title */}
            <Text style={styles.mainTitle}>Sign in to your account</Text>
            <Text style={styles.subtitle}>Welcome back! Select method to log in</Text>

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

            <View style={styles.optionsRow}>
                <TouchableOpacity 
                    style={styles.checkboxContainer}
                    onPress={() => setRememberMe(!rememberMe)}
                >
                    <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                        {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                </TouchableOpacity>
            </View>

            <GradientBtn 
                text="Log In" 
                onPress={() => {
                    // TODO: Implement login logic
                    console.log('Login:', { email, password, rememberMe });
                }} 
            />

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or Continue With</Text>
                <View style={styles.dividerLine} />
            </View>

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

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: theme.background.primary,
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
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 12,
        fontWeight: 'bold',
    },
    checkboxLabel: {
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    forgetPassword: {
        fontSize: 14,
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.secondary,
    },
    signUpLink: {
        fontSize: 14,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.accent.magenta,
        fontWeight: '600',
    },
});

export default LoginScreen;