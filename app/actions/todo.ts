'use server';

import type { CreateTodo } from '../types/todo';
import { getTodoService } from '@/lib/service';

export async function createTodo(data: CreateTodo) {
	try {
		const todoService = getTodoService();
		const todo = await todoService.createTodo(data);

		if (!todo) {
			throw new Error('Failed to create todo');
		}

		return {
			success: true,
			todo,
		};
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			return {
				success: false,
				error: error.message,
			};
		}
    return {
      success: false,
      error: 'Unknown error occurred',
    }
	}
}
