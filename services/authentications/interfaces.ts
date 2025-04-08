interface IAuthenticationService {
  signIn(username: string, password: string): Promise<string | null>;
}

export type { IAuthenticationService };
