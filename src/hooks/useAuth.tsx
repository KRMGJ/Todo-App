import React, { createContext, useContext, useEffect, useState, } from 'react';
import { type User, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * @description Authentication context value type definition (인증 컨텍스트 값 타입 정의)
 * @author 장민규
 * @created 2025-11-20
 */
type AuthContextValue = {
    user: User | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

/**
 * @description Authentication context for managing user authentication state and actions (인증 상태 및 동작 관리를 위한 인증 컨텍스트)
 * @author 장민규
 * @created 2025-11-20
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * @description Provider component for the authentication context (인증 컨텍스트의 제공자)
 * @author 장민규
 * @created 2025-11-20
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     * @description Effect to monitor authentication state changes (인증 상태 변경 모니터링 효과)
     * @author 장민규
     * @created 2025-11-20
     */
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unSub();
    }, []);

    /**
     * @description Function to sign up a new user with email and password (이메일과 비밀번호로 새 사용자 등록 함수)
     * @author 장민규
     * @created 2025-11-20
     */
    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    /**
     * @description Function to sign in an existing user with email and password (이메일과 비밀번호로 기존 사용자 로그인 함수)
     * @author 장민규
     * @created 2025-11-20
     */
    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    /**
     * @description Function to log out the current user (현재 사용자 로그아웃 함수)
     * @author 장민규
     * @created 2025-11-20
     */
    const logout = async () => {
        await signOut(auth);
    };

    /**
     * @description Authentication context value (인증 컨텍스트 값)
     * @author 장민규
     * @created 2025-11-20
     */
    const value: AuthContextValue = {
        user,
        loading,
        signUp,
        signIn,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * @description Custom hook to access the authentication context (인증 컨텍스트에 접근하기 위한 커스텀 훅)
 * @author 장민규
 * @created 2025-11-20
 */
export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
};
