import type { Todo } from '@prisma/client';

interface ITodoService {
	getTodos(): Promise<Todo[]>;
}

export type { ITodoService };
