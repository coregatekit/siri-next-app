import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const cookieStore = await cookies();
		cookieStore.delete('token');

		return NextResponse.redirect(new URL('/login', request.url), {
			status: 301,
		});
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
	}
}
