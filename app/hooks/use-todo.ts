import type { Todo } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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

	const markAsDone = async (id: string) => {
		try {
			const response = await fetch(`/api/todos?id=${id}`, {
				method: 'PATCH',
			});

			if (!response.ok) {
				const errMessage = await response.json();
				throw new Error(errMessage.message);
			}

			const updatedTodos = todos.map((todo) =>
				todo.id === id ? { ...todo, done: true } : todo,
			);
			setTodos(updatedTodos);
			toast.success('Todo marked as done successfully');
		} catch (error) {
			console.error('Error marking todo as done:', error);
			toast.error(
				error instanceof Error ? error.message : 'Failed to mark todo as done',
			);
		}
	};

	const deleteTodo = async (id: string) => {
		try {
			const response = await fetch(`/api/todos?id=${id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				const errMessage = await response.json();
				throw new Error(errMessage.message);
			}

			const updatedTodos = todos.filter((todo) => todo.id !== id);
			setTodos(updatedTodos);
			toast.success('Todo deleted successfully');
		} catch (error) {
			console.error('Error deleting todo:', error);
			toast.error(
				error instanceof Error ? error.message : 'Failed to delete todo',
			);
		}
	};

	return { todos, loading, markAsDone, deleteTodo };
}
