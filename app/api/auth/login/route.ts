import { getAuthenticationService } from '@/lib/service';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json(
				{ message: 'Username and password are required' },
				{ status: 400 },
			);
		}

		const authService = getAuthenticationService();
		const response = await authService.signIn(username, password);

		if (!response.success) {
			return NextResponse.json({ message: response.message }, { status: 401 });
		}

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred during login' },
			{ status: 500 },
		);
	}
}
