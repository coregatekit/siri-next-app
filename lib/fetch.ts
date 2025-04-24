export type FetchOptions = {
	headers?: {
		[key: string]: string;
	};
} & RequestInit;

export async function fetchWithCredentials(
	path: string,
	options: FetchOptions = {},
) {
	const defaultOptions: FetchOptions = {
		...options,
		credentials: 'include',
	};

	const handleResponse = async (resp: Response): Promise<Response> => {
		if (resp.status === 401) {
			try {
				const refreshResponse = await fetch('/api/auth/refresh', {
					method: 'GET',
					credentials: 'include',
				});

				if (!refreshResponse.ok) {
					const data = await refreshResponse.json();
					throw new Error(data.message || 'Failed to refresh token');
				}

				return fetch(path, defaultOptions);
			} catch (error) {
				console.error('Error refreshing token:', error);
				window.location.href = '/login';
			}
		}

		return resp;
	};

	const response = await fetch(path, defaultOptions);
	return handleResponse(response);
}
