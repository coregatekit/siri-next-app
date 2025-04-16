type LoginForm = {
	username: string;
	password: string;
};

type LoginResult = {
	success: boolean;
	message: string;
	token?: string;
}

type UserData = {
	id: string;
	username: string;
	name: string;
}

export type { LoginForm, LoginResult, UserData };
