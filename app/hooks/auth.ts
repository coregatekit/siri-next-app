'use client';

import { useState } from 'react';

export default function useAuth() {
	const authRoute = '/api/auth/login';

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const login = async (username: string, password: string) => {
		setIsLoading(true);
		try {
			const response = await fetch(authRoute, {
				method: 'POST',
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Login failed');
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

	return {
		login,
		isLoading,
		error,
	};
}
