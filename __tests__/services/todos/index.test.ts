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
});
