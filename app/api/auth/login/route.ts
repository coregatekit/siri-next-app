import { ONE_HOUR } from '@/commons/constants';
import { getAuthenticationService } from '@/lib/service';
import { cookies } from 'next/headers';
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

		// Set cookies
		(await cookies()).set({
			name: 'token',
			value: response.accessToken as string,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: ONE_HOUR,
		});

		return NextResponse.redirect(new URL('/', request.url), { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: 'An error occurred during login' },
			{ status: 500 },
		);
	}
}
