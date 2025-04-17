'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function useAuth() {
	const authRoute = '/api/auth/login';
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(authRoute, {
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

			if (response.status === 301 || response.redirected) {
				router.push('/');
				return;
			}

			router.push('/');
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
		setIsLoading(true);
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST',
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.log(errorData);
				toast.error(errorData.error || 'An unknown error occurred', {
					duration: 5000,
				});
				return;
			}

			if (response.status === 301 || response.redirected) {
				router.push('/');
				return;
			}
			return;
		} catch (error: unknown) {
			console.error('Logout error:', error);
			toast.error(
				error instanceof Error ? error.message : 'An unknown error occurred',
				{ duration: 5000 },
			);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		login,
		logout,
		isLoading,
		error,
	};
}
