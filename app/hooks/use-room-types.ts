import { fetchWithCredentials } from '@/lib/fetch';
import { useQuery } from '@tanstack/react-query';

export default function useRoomTypes() {
	const baseApiUrl = '/api/room-types';

	const fetchRoomTypes = async () => {
		const response = await fetchWithCredentials(baseApiUrl);
		if (!response.ok) {
			const data = await response.json();
			throw new Error(data.message || 'Failed to fetch room types');
		}
		const data = await response.json();
		return data;
	};

	const {
		data: roomTypeData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['room-types'],
		queryFn: fetchRoomTypes,
	});

	return {
		roomTypeData,
		isLoading,
		error,
	}
}
