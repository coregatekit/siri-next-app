import type { CreateTodo } from '@/app/types/todo';
import type { Todo } from '@prisma/client';

interface ITodoService {
	getTodos(): Promise<Todo[]>;
  createTodo(todo: CreateTodo): Promise<Todo>;
  markAsDone(id: string): Promise<Todo>;
  deleteTodo(id: string): Promise<Todo>;
}

export type { ITodoService };
