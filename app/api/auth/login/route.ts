import { ONE_HOUR } from '@/commons/constants';
import { getAuthenticationService } from '@/lib/service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { username, password } = await request.json();

		if (!username || !password) {
			return NextResponse.json(
				{
					message: 'Username and password are required',
				},
				{ status: 400 },
			);
		}

		const authService = getAuthenticationService();
		const resp = await authService.signIn(username, password);

		if (!resp.success) {
			return NextResponse.json({ message: resp.message }, { status: 401 });
		}

		// Set cookies
		const cookieStore = await cookies();
		cookieStore.set({
			name: 'token',
			value: resp.accessToken as string,
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: ONE_HOUR,
			path: '/',
		});

		return NextResponse.redirect(new URL('/', request.url), {
			status: 301,
		});
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json(
			{ message: 'An error occurred during login' },
			{ status: 500 },
		);
	}
}
