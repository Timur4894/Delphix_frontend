import React, { useState, useContext } from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    TextInput, 
    Image, 
    Alert,
    ActivityIndicator 
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stackNavigation/MainNavigation";
import { launchImageLibrary, ImagePickerResponse, MediaType } from "react-native-image-picker";
import theme from "../../constants/colors";
import { fontSizes, spacing, sizes } from "../../utils/fontSizes";
import Header from "../../components/Header";
import GradientBtn from "../../components/GradientBtn";
import { AuthContext } from "../../context/AuthContext";
import { updateUserApi } from "../../api/userApi";

type EditProfileScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'EditProfile'>;
type EditProfileScreenRouteProp = RouteProp<MainStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
    const navigation = useNavigation<EditProfileScreenNavigationProp>();
    const route = useRoute<EditProfileScreenRouteProp>();
    const { user, fetchUser } = useContext(AuthContext);
    
    const [userName, setUserName] = useState(user?.user_name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatar, setAvatar] = useState(user?.avatar || null);
    const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar || null);
    const [loading, setLoading] = useState(false);

    const handlePickImage = () => {
        const options = {
            mediaType: 'photo' as MediaType,
            quality: 0.8 as any,
            maxWidth: 1000,
            maxHeight: 1000,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                return;
            }
            
            if (response.errorMessage) {
                Alert.alert("Error", response.errorMessage);
                return;
            }

            if (response.assets && response.assets[0]) {
                const asset = response.assets[0];
                if (asset.uri) {
                    setAvatarUri(asset.uri);
                    // Сохраняем файл для отправки
                    setAvatar(asset);
                }
            }
        });
    };

    const handleSave = async () => {
        if (!user?.user?.id) {
            Alert.alert("Error", "User ID not found");
            return;
        }

        if (!userName.trim()) {
            Alert.alert("Error", "Name is required");
            return;
        }

        if (!email.trim()) {
            Alert.alert("Error", "Email is required");
            return;
        }

        setLoading(true);
        try {
            let updateData;
            
            // Если выбрано новое изображение, отправляем FormData
            if (avatar && avatar.uri) {
                const formData = new FormData();
                formData.append('user_name', userName);
                formData.append('email', email);
                // В React Native файл должен быть объектом с uri, type и name
                formData.append('avatar', {
                    uri: avatar.uri,
                    type: avatar.type || 'image/jpeg',
                    name: avatar.fileName || `avatar_${Date.now()}.jpg`,
                } as any);
                updateData = formData;
                console.log('Sending FormData with avatar:', {
                    user_name: userName,
                    email: email,
                    hasAvatar: true
                });
            } else {
                // Если нет аватара, отправляем обычный JSON
                updateData = {
                    user_name: userName,
                    email: email,
                };
                console.log('Sending JSON data:', updateData);
            }

            // Обновляем пользователя
            console.log('Updating user with ID:', user.user.id);
            await updateUserApi(user.user.id, updateData);
            
            // Обновляем данные пользователя в контексте
            await fetchUser();
            
            Alert.alert("Success", "Profile updated successfully");
            navigation.goBack();
        } catch (error: any) {
            console.error('Error updating profile:', error);
            Alert.alert(
                "Error", 
                error.response?.data?.message || error.message || "Failed to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Header title="Edit Profile" />

            <View style={styles.content}>
                {/* Avatar Section */}
                {/* <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        {avatarUri ? (
                            <Image source={{ uri: avatarUri }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.avatarPlaceholder]}>
                                <Text style={styles.avatarPlaceholderText}>
                                    {(userName || "U").charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.changeAvatarButton} onPress={handlePickImage}>
                        <Text style={styles.changeAvatarText}>Change Photo</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Name Input */}
                <Text style={styles.sectionTitle}>Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        placeholderTextColor={theme.text.placeholder}
                        value={userName}
                        onChangeText={setUserName}
                        autoCapitalize="words"
                    />
                </View>

                {/* Email Input */}
                <Text style={styles.sectionTitle}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor={theme.text.placeholder}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                {/* Save Button */}
                <GradientBtn
                    text={loading ? "Saving..." : "Save Changes"}
                    onPress={loading ? () => {} : handleSave}
                />
                {loading && (
                    <ActivityIndicator 
                        size="small" 
                        color={theme.accent.magenta} 
                        style={{ marginTop: 10 }} 
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background.primary,
    },
    content: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xxl,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    avatarContainer: {
        marginBottom: spacing.lg,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: theme.background.secondary,
    },
    avatarPlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.accent.magenta,
    },
    avatarPlaceholderText: {
        fontSize: fontSizes.xlarge,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    changeAvatarButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: sizes.cardBorderRadius,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    changeAvatarText: {
        fontSize: fontSizes.body,
        color: theme.accent.magenta,
        fontFamily: 'ZalandoSansExpanded-Italic',
    },
    sectionTitle: {
        fontSize: fontSizes.h5,
        fontWeight: 'bold',
        color: theme.text.primary,
        fontFamily: 'ZalandoSansExpanded-Italic',
        marginTop: spacing.xl,
        marginBottom: spacing.md,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.background.tertiary,
        borderRadius: sizes.cardBorderRadius,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: theme.border.default,
    },
    input: {
        flex: 1,
        fontSize: fontSizes.body,
        fontFamily: 'ZalandoSansExpanded-Italic',
        color: theme.text.primary,
        paddingVertical: spacing.lg,
    },
});

export default EditProfileScreen;

