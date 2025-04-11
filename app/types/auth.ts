type JwtPayload = {
	id: string;
	username: string;
	name: string;
};
type SessionPayload = JwtPayload & {};

type UserData = {
	id: string;
	username: string;
	name: string;
}

export type { JwtPayload, SessionPayload, UserData };
