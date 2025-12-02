import AsyncStorage from '@react-native-async-storage/async-storage';

export const TOKEN_KEY = 'access_token';

export const tokenStorage = {
  async getToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      console.log('Token saved successfully');
      // Проверяем что токен действительно сохранился
      const saved = await AsyncStorage.getItem(TOKEN_KEY);
      if (saved !== token) {
        console.error('Token was not saved correctly!');
      }
    } catch (error) {
      console.error('Error setting token:', error);
      throw error;
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },
};

