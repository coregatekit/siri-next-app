'use server';

import { getAuthenticationService } from '@/lib/service';
import { LoginFormSchema, type LoginFormState } from '../login/container';
import { cookies } from 'next/headers';
import { ONE_HOUR } from '@/commons/constants';
import { redirect } from 'next/navigation';

export async function login(state: LoginFormState, formData: FormData) {
	// Validate the form data
	const validatedData = LoginFormSchema.safeParse({
		username: formData.get('username'),
		password: formData.get('password'),
	});

	// Check if the validation was successful
	if (!validatedData.success) {
		return {
			errors: validatedData.error.flatten().fieldErrors,
		};
	}

	// Login logic
	const authService = getAuthenticationService();
	const data = {
		username: validatedData.data.username,
		password: validatedData.data.password,
	};
	const result = await authService.signIn(data.username, data.password);

	if (!result.success) {
		return {
			errors: result.message,
		};
	}

	// Set cookies
	(await cookies()).set({
		name: 'token',
		value: result.accessToken as string,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: ONE_HOUR,
	});

	(await cookies()).set({
		name: 'user',
		value: JSON.stringify({}),
		path: '/',
		httpOnly: false,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		maxAge: ONE_HOUR,
	});

	redirect('/');
}
