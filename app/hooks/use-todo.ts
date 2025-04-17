import type { Todo } from '@prisma/client';
import { useEffect, useState } from 'react';

export default function useTodo() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTodos = async () => {
			setLoading(true);
			const response = await fetch('/api/todos');
			if (!response.ok) {
				throw new Error('Failed to fetch todos');
			}

			const data = await response.json();
			setTodos(data);
			setLoading(false);
		};

		fetchTodos().catch((error) => {
			console.error('Error fetching todos:', error);
			setLoading(false);
		});
	}, []);

	return { todos, loading };
}
