type LoginForm = {
	username: string;
	password: string;
};

type LoginResult = {
	success: boolean;
	message: string;
	token?: string;
}

export type { LoginForm, LoginResult };
