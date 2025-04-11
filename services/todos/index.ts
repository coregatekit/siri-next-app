import type { PrismaClient, Todo } from '@prisma/client';
import type { ITodoService } from './interfaces';

export class TodoService implements ITodoService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getTodos(): Promise<Todo[]> {
    return [];
  }
}