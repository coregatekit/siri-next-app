import { NextResponse, type NextRequest } from 'next/server';
import { AuthRoutes, ProtectedRoutes } from './lib/paths';
import { JWT_SECRET } from './commons/constants';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value;
	const path = request.nextUrl.pathname;
	console.log('current path: ', path);

	// Check if path is protected
	const isProtectedRoute = ProtectedRoutes.some(
		(route) => path === route || path.startsWith(`${route}/`),
	);

	// Check if path is auth route
	const isAuthRoute = AuthRoutes.some((route) => path === route);

	console.log('isProtectedRoute:', isProtectedRoute);
	console.log('isAuthRoute:', isAuthRoute);
	try {
		if (!token && isProtectedRoute) {
			return NextResponse.redirect(new URL('/sign-in', request.url));
		}

		if (token) {
			// Verify token
			const secret = new TextEncoder().encode(JWT_SECRET);
			const { payload } = await jwtVerify(token, secret);

			// If verified and on auth route, redirect to root path
			if (isAuthRoute) {
				return NextResponse.redirect(new URL('/', request.url));
			}
		}
	} catch (error) {
		if (isProtectedRoute) {
			const response = NextResponse.redirect(new URL('/sign-in', request.url));
			response.cookies.delete('token');
			response.cookies.delete('user');
			return response;
		}
	}

	return NextResponse.next();
}

// Configure which routes to apply the middleware to
export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * - API routes
		 * - Static files
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|images|favicon.ico).*)',
	],
};
