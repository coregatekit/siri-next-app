'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { SignInFormData } from '@/app/types/sign-in';

type Props = {
  title: string;
	handleSignIn: (data: SignInFormData) => void;
};

const SignInFormSchema = z.object({
	username: z
		.string()
		.min(6, { message: 'Username must be at least 6 characters long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
});

function SignInBox({ title, handleSignIn }: Props) {
	const form = useForm<z.infer<typeof SignInFormSchema>>({
		resolver: zodResolver(SignInFormSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (data: z.infer<typeof SignInFormSchema>) => {
    handleSignIn(data);
  };

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full max-w-sm p-4 bg-white rounded shadow-md'
				>
					<h1 className='my-4 text-xl'>{title}</h1>
					<div className='flex flex-col gap-4'>
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
						<Button type='submit'>Sign in</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default SignInBox;
