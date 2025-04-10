// Routes that require authentication
const ProtectedRoutes = ['/', '/booking'];

// Routes that do not require authentication and should redirect to root path if already logged in
const AuthRoutes = ['/sign-in'];

export {
  ProtectedRoutes,
  AuthRoutes,
}