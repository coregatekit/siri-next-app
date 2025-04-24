import { RoomTypeService } from '@/services/room-types';
import type { IRoomTypeService } from '@/services/room-types/interfaces';
import type { PrismaClient, Type } from '@prisma/client';
import { mockDeep, type DeepMockProxy } from 'jest-mock-extended';

jest.mock('@prisma/client', () => ({
	PrismaClient: jest.fn(),
}));

describe('RoomType Service', () => {
	let service: IRoomTypeService;
	let prisma: DeepMockProxy<PrismaClient>;

	beforeEach(() => {
		jest.clearAllMocks();
		prisma = mockDeep<PrismaClient>();
		service = new RoomTypeService(prisma);
	});

	describe('getAllRoomTypes', () => {
		it('should return array of room types', async () => {
			// Arrange
			const mockRoomTypes: Type[] = [
				{
					id: '1',
					name: 'Deluxe Room',
					detail: 'A spacious room with a king-size bed and a beautiful view.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: '2',
					name: 'Standard Room',
					detail: 'A comfortable room with all basic amenities.',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			];
			prisma.type.findMany.mockResolvedValue(mockRoomTypes);

			// Act
			const result = await service.getAllRoomTypes();

			// Assert
			expect(result).toEqual(mockRoomTypes);
			expect(result).toHaveLength(2);
			expect(prisma.type.findMany).toHaveBeenCalled();
		});

		it('should return empty array if no room types found', async () => {
			// Arrange
			prisma.type.findMany.mockResolvedValue([]);

			// Act
			const result = await service.getAllRoomTypes();

			// Assert
			expect(result).toEqual([]);
			expect(prisma.type.findMany).toHaveBeenCalled();
		});

		it('should return room types without detail if detail is null', async () => {
			// Arrange
			prisma.type.findMany.mockResolvedValue([
				{
					id: '1',
					name: 'Deluxe Room',
					detail: null,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);

			// Act
			const result = await service.getAllRoomTypes();

			// Assert
			expect(result).toEqual([
				{
					id: '1',
					name: 'Deluxe Room',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			]);
		});

		it('should throw an error if fetching room types fails', async () => {
			// Arrange
			const errorMessage = 'Database error';
			prisma.type.findMany.mockRejectedValue(new Error(errorMessage));

			// Act & Assert
			await expect(service.getAllRoomTypes()).rejects.toThrow(
				'Failed to fetch room types',
			);
			expect(prisma.type.findMany).toHaveBeenCalled();
		});
	});

	describe('createRoomType', () => {
		it('should create a new room type', async () => {
			// Arrange
			const newRoomType = {
				name: 'Suite Room',
				detail: 'A luxurious suite with a separate living area.',
			};
			const createdRoomType = {
				id: '3',
				name: 'Suite Room',
				detail: 'A luxurious suite with a separate living area.',
				createdAt: new Date(),
				updatedAt: new Date(),
			};

			prisma.type.create.mockResolvedValue(createdRoomType);

			// Act
			const result = await service.createRoomType(newRoomType);

			// Assert
			expect(result).toEqual(createdRoomType);
			expect(prisma.type.create).toHaveBeenCalledWith({
				data: newRoomType,
			});
		});

		it('should throw an error if creating room type fails', async () => {
			// Arrange
			const newRoomType = {
				name: 'Suite Room',
				detail: 'A luxurious suite with a separate living area.',
			};
			const errorMessage = 'Database error';
			prisma.type.create.mockRejectedValue(new Error(errorMessage));

			// Act & Assert
			await expect(service.createRoomType(newRoomType)).rejects.toThrow(
				'Failed to create room type',
			);
			expect(prisma.type.create).toHaveBeenCalledWith({
				data: newRoomType,
			});
		});
	});
});
