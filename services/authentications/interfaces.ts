interface IAuthenticationService {
  signIn(username: string, password: string): Promise<string>;
}

export type { IAuthenticationService };
