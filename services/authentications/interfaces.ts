interface IAuthenticationService {
  signIn(username: string, password: string): Promise<SignInResult>;
}

interface SignInResult {
  success: boolean;
  message: string;
  accessToken?: string;
}

export type { IAuthenticationService, SignInResult };
