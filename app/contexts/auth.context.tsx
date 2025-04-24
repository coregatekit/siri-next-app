'use client';

import {
	createContext,
	useContext,
	useState,
	type ReactNode,
} from 'react';
import type { UserData } from '../types/auth';
import { useRouter } from 'next/navigation';

type AuthContextType = {
	isAuthenticated: boolean;
	isLoading: boolean;
	error: string | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<UserData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const router = useRouter();

	const login = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.message);
				console.log(errorData);
			}

			const userResponse = await fetch('/api/auth/me');
			if (userResponse.ok) {
				const userData = await userResponse.json();
				setUser(userData);
        setIsAuthenticated(true);
				router.push('/');
			}
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error.message : 'An unknown error occurred',
			);
			console.error('Login error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);
				setError(errorData.error || 'An unknown error occurred');
				return;
			}

			setUser(null);
      setIsAuthenticated(false);
			router.push('/login');
		} catch (error: unknown) {
			setError(
				error instanceof Error ? error.message : 'An unknown error occurred',
			);
			console.error('Logout error:', error);
		}
	};

	const checkAuth = async () => {
		setIsLoading(true);
		try {
			const userResponse = await fetch('/api/auth/me');
			if (userResponse.ok) {
				const userData = await userResponse.json();
				setUser(userData);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (error: unknown) {
			setUser(null);
			setIsAuthenticated(false);
			setError(
				error instanceof Error ? error.message : 'An unknown error occurred'
			);
			console.error('Auth check error:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isLoading, error, login, logout, checkAuth }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
}
