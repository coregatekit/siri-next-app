interface IRoomTypeService {
  getAllRoomTypes(): Promise<RoomTypeData[]>;
  createRoomType(data: CreateRoomType): Promise<RoomTypeData>;
}

interface RoomTypeData {
  id: string;
  name: string;
  detail: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateRoomType {
  name: string;
  detail?: string;
}

export type { IRoomTypeService, RoomTypeData, CreateRoomType };
