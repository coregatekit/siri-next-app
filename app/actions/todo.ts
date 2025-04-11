import type { CreateTodo } from '../types/todo';
import { getTodoService } from '@/lib/service';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export async function createTodo(data: CreateTodo) {
	try {
		const todoService = getTodoService();
		const todo = await todoService.createTodo(data);
		if (!todo) {
			throw new Error('Failed to create todo');
		}

		toast.success('Todo created successfully', {
			description: `The todo ${data.title} has been created successfully`,
		});
		redirect('/todo');
	} catch (error) {
		toast.error('Error', {
			description: (error as Error).message,
		});
	}
}
