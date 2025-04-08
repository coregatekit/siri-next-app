type JwtPayload = {
	id: string;
	username: string;
	name: string;
};
type SessionPayload = JwtPayload & {};

export type { JwtPayload, SessionPayload };
