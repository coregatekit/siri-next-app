'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';

const LoginFormSchema = z.object({
	username: z
		.string()
		.min(6, { message: 'Username must be at least 6 characters long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
});

function LoginContainer() {
	const loginForm = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
		// Handle login logic here
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<Form {...loginForm}>
				<form
					onSubmit={loginForm.handleSubmit(onSubmit)}
					className="w-full max-w-sm p-4 bg-white rounded shadow-md"
				>
					<h1 className="my-4 text-xl">Login</h1>
					<div className="flex flex-col gap-4">
						<FormField
							control={loginForm.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={loginForm.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Login</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default LoginContainer;
