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

	async markAsDone(id: string): Promise<Todo> {
		const todo = await this.prisma.todo.findFirst({ where: { id } });
		if (!todo) {
			throw new Error('Todo not found');
		}

		const updatedTodo = await this.prisma.todo.update({
			where: {
				id,
			},
			data: {
				done: true,
			},
		});
		return updatedTodo;
	}

	async deleteTodo(id: string): Promise<Todo> {
		const todo = await this.prisma.todo.findFirst({ where: { id } });
		if (!todo) {
			throw new Error('Todo not found');
		}

		const deletedTodo = await this.prisma.todo.delete({
			where: {
				id,
			},
		});

		return deletedTodo;
	}
}
