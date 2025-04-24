interface IRoomTypeService {
  getAllRoomTypes(): Promise<RoomTypeData[]>;
}

interface RoomTypeData {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IRoomTypeService, RoomTypeData };
