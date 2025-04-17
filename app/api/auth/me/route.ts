import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('token')?.value;
		if (!token) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		return NextResponse.json(
			{
				id: 'mock',
				username: 'aerichandesu',

				name: 'Uchinaga Aeri',
				avatar: 'https://github.com/shadcn.png',
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('Error fetching user data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch user data' },
			{ status: 500 },
		);
	}
}
