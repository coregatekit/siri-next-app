import Routes from '@/commons/routes';

// Routes that require authentication
const ProtectedRoutes = [
	Routes.HOME,
	Routes.PROFILE,
	Routes.SETTINGS,
	Routes.BOOKING,
];

// Routes that do not require authentication and should redirect to root path if already logged in
const AuthRoutes = ['/sign-in', '/login'];

export { ProtectedRoutes, AuthRoutes };
