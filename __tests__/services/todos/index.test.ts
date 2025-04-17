import type { CreateTodo } from '@/app/types/todo';
import { TodoService } from '@/services/todos';
import type { ITodoService } from '@/services/todos/interfaces';
import type { PrismaClient, Todo } from '@prisma/client';
import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';

jest.mock('@prisma/client', () => ({
	PrismaClient: jest.fn(),
}));

describe('Todos Service', () => {
	let service: ITodoService;
	let prisma: DeepMockProxy<PrismaClient>;

	beforeEach(() => {
		jest.clearAllMocks();
		prisma = mockDeep<PrismaClient>();
		service = new TodoService(prisma);
	});

	describe('getTodos', () => {
		const todo1: Todo = {
			id: '1',
			title: 'Todo 1',
			description: 'Description 1',
			done: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const todo2: Todo = {
			id: '2',
			title: 'Todo 2',
			description: 'Description 1',
			done: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		it('should return an empty array', async () => {
			// Arrange
			prisma.todo.findMany.mockResolvedValue([]);

			// Act
			const result = await service.getTodos();

			// Assert
			expect(result).toEqual([]);
			expect(prisma.todo.findMany).toHaveBeenCalled();
		});

		it('should return a list of todos', async () => {
			// Arrange
			prisma.todo.findMany.mockResolvedValue([todo1, todo2]);

			// Act
			const result = await service.getTodos();

			// Assert
			expect(result).toEqual([todo1, todo2]);
			expect(prisma.todo.findMany).toHaveBeenCalled();
		});
	});

	describe('createTodo', () => {
		it('should create a todo successfully', async () => {
			// Arrange
			const todoData: CreateTodo = {
				title: 'New Todo',
				description: 'Todo description',
			};
			prisma.todo.create.mockResolvedValue({
				id: '1',
				title: todoData.title,
				description: todoData.description,
				done: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Act
			const result = await service.createTodo(todoData);

			// Assert
			expect(result).toEqual({
				id: expect.any(String),
				title: todoData.title,
				description: todoData.description,
				done: false,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			});
			expect(prisma.todo.create).toHaveBeenCalledWith({
				data: {
					title: todoData.title,
					description: todoData.description,
				},
			});
		});
	});

	describe('markTodoAsDone', () => {
		it('should mark a todo as done successfully', async () => {
			// Arrange
			const todoId = '1';
			prisma.todo.findFirst.mockResolvedValue({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			prisma.todo.update.mockResolvedValue({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Act
			const result = await service.markAsDone(todoId);

			// Assert
			expect(result).toEqual({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: true,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			});
			expect(prisma.todo.findFirst).toHaveBeenCalledWith({
				where: { id: todoId },
			});
			expect(prisma.todo.update).toHaveBeenCalledWith({
				where: { id: todoId },
				data: { done: true },
			});
		});

		it('should throw an error if todo not found', async () => {
			// Arrange
			const todoId = '1';
			prisma.todo.findFirst.mockResolvedValue(null);

			// Act & Assert
			await expect(service.markAsDone(todoId)).rejects.toThrow(
				'Todo not found',
			);
			expect(prisma.todo.findFirst).toHaveBeenCalledWith({
				where: { id: todoId },
			});
		});
	});

	describe('deleteTodo', () => {
		it('should delete a todo successfully', async () => {
			// Arrange
			const todoId = '1';
			prisma.todo.findFirst.mockResolvedValue({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			prisma.todo.delete.mockResolvedValue({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			});

			// Act
			const result = await service.deleteTodo(todoId);

			// Assert
			expect(result).toEqual({
				id: todoId,
				title: 'Todo 1',
				description: 'Description 1',
				done: false,
				createdAt: expect.any(Date),
				updatedAt: expect.any(Date),
			});
			expect(prisma.todo.findFirst).toHaveBeenCalledWith({
				where: { id: todoId },
			});
			expect(prisma.todo.delete).toHaveBeenCalledWith({
				where: { id: todoId },
			});
		});

		it('should thow an error if todo not found', async () => {
			// Arrange
			const todoId = '1';
			prisma.todo.findFirst.mockResolvedValue(null);

			// Act & Assert
			await expect(service.deleteTodo(todoId)).rejects.toThrow(
				'Todo not found',
			);
			expect(prisma.todo.findFirst).toHaveBeenCalledWith({
				where: { id: todoId },
			});
		});
	});
});
