import { getRoomTypeService } from '@/lib/service';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	try {
		const roomTypeService = getRoomTypeService();
		const roomTypes = await roomTypeService.getAllRoomTypes();

		return NextResponse.json(roomTypes, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { name, detail } = await request.json();

		const roomTypeService = getRoomTypeService();
		const roomType = await roomTypeService.createRoomType({
			name,
			detail,
		});

		return NextResponse.json(roomType, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
