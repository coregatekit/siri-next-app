import type { CreateTodo } from '@/app/types/todo';
import type { Todo } from '@prisma/client';

interface ITodoService {
	getTodos(): Promise<Todo[]>;
  createTodo(todo: CreateTodo): Promise<Todo>;
}

export type { ITodoService };
