import type { PrismaClient, Todo } from '@prisma/client';
import type { ITodoService } from './interfaces';
import type { CreateTodo } from '@/app/types/todo';

export class TodoService implements ITodoService {
	private readonly prisma: PrismaClient;

	constructor(prisma: PrismaClient) {
		this.prisma = prisma;
	}

	async getTodos(): Promise<Todo[]> {
		const todos = await this.prisma.todo.findMany();
		return todos;
	}

	async createTodo(todo: CreateTodo): Promise<Todo> {
		const newTodo = await this.prisma.todo.create({
			data: {
				title: todo.title,
				description: todo.description,
			},
		});
		return newTodo;
	}

	async deleteTodo(id: string): Promise<Todo> {
		const deletedTodo = await this.prisma.todo.delete({
			where: {
				id,
			},
		});

		if (!deletedTodo) {
			throw new Error('Todo not found');
		}

		return deletedTodo;
	}
}
