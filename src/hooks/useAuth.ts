import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  role?: string;
  isVerified: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem('seller_auth');
        if (authData) {
          const parsed = JSON.parse(authData);
          console.log('Initial auth data check:', parsed);
          setUser(parsed);
        }
      } catch (error) {
        console.error('Auth data parsing error:', error);
        localStorage.removeItem('seller_auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User) => {
    try {
      console.log('useAuth login 호출됨:', userData);
      localStorage.setItem('seller_auth', JSON.stringify(userData));
      setUser(userData);
      setIsLoading(false);
      console.log('localStorage 저장 완료, user state 업데이트됨');
    } catch (error) {
      console.error('로그인 저장 오류:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('seller_auth');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 오류:', error);
      window.location.href = '/';
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
