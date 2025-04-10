'use server';

import { getAuthenticationService } from '@/lib/service';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ONE_HOUR } from '@/commons/constants';

export async function signIn(formData: FormData) {
	try {
		const authService = getAuthenticationService();
		const data = {
			username: formData.get('username') as string,
			password: formData.get('password') as string,
		};
		const result = await authService.signIn(data.username, data.password);

		if (!result.success) {
			return {
				success: false,
				error: result.message,
			};
		}

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
      value: JSON.stringify({
      }),
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ONE_HOUR,
    });

		redirect('/');
	} catch (error) {
    console.error('Error signing in:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'Unknown error occurred',
    };
  }
}
