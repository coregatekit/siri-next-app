'use client';

import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '../hooks/auth';

export const LoginFormSchema = z.object({
	username: z
		.string()
		.min(6, { message: 'Username must be at least 6 characters long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.trim(),
});

export default function LoginContainer() {
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});
	const { login, isLoading, error } = useAuth();

	const handleAction = async (data: z.infer<typeof LoginFormSchema>) => {
		await login(data.username, data.password);
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleAction)}
					className='w-full max-w-sm p-4 bg-white rounded shadow-md'
				>
					<h1 className='my-4 text-xl'>Login</h1>
					<div className='flex flex-col gap-4'>
						{/* Username */}
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Username' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Password */}
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type='password' placeholder='Password' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Error Message */}
						{error && <div className='text-red-500 text-sm'>{error}</div>}

						{/* Submit Button */}
						<Button
							className='cursor-pointer'
							type='submit'
							disabled={isLoading}
						>
							Sign in
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
