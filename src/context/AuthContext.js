import { createContext, useState, useEffect } from 'react';
import { tokenStorage } from '../utils/tokenStorage';
import { getMeApi } from '../api/userApi';
import { logoutApi } from '../api/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const profile = await getMeApi();
      setUser(profile);
      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response?.status === 401) {
        console.log('Token invalid - removing from storage');
        await tokenStorage.removeToken();
        setUser(null);
      }
      throw error;
    }
  };

  const login = async (userData, authToken) => {
    try {
        console.log('login: ', authToken);
      await tokenStorage.setToken(authToken);
      setUser(userData);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const savedToken = await tokenStorage.getToken();
        console.log('Loading auth - token exists:', !!savedToken);
        if (savedToken) {
          try {
            await fetchUser();
          } catch (error) {
            // Если ошибка 401, токен уже удален в fetchUser
            // Для других ошибок просто не устанавливаем пользователя, но токен остается
            if (error.response?.status !== 401) {
              console.log('Network error - keeping token, user not loaded');
            }
            setUser(null);
          }
        } else {
          console.log('No saved token found');
        }
      } catch (error) {
        console.error('Error loading auth:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      fetchUser,
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
