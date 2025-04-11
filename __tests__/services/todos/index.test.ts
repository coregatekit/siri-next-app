import { TodoService } from '@/services/todos';
import type { ITodoService } from '@/services/todos/interfaces';
import type { PrismaClient } from '@prisma/client';
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
    it('should return an empty array', async () => {
      // Arrange

      // Act
      const result = await service.getTodos();

      // Assert
      expect(result).toEqual([]);
    });
  });
});
