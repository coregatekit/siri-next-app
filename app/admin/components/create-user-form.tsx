import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateUserFormSchema = z
	.object({
		username: z
			.string()
			.min(6, { message: 'Username must be at least 6 characters long' }),
		password: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' }),
		confirmPassword: z
			.string()
			.min(8, { message: 'Password must be at least 8 characters long' }),
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long' }),
		email: z.string().email({ message: 'Invalid email address' }),
		mobile: z.string().optional(),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Passwords do not match',
				path: ['confirmPassword'],
			});
		}
	});

function CreateUserForm() {
	const form = useForm<z.infer<typeof CreateUserFormSchema>>({
		resolver: zodResolver(CreateUserFormSchema),
		defaultValues: {
			username: '',
			password: '',
			confirmPassword: '',
			name: '',
			email: '',
			mobile: '',
		},
	});

	const onSubmit = (data: z.infer<typeof CreateUserFormSchema>) => {
		// Handle user creation logic here
		console.log('User data:', data);
	};

	return (
		<Card className='w-96 h-full p-4'>
			<h1 className='text-xl'>Create a new user</h1>
			<Form {...form}>
				<form
					className='flex flex-col justify-center gap-2 w-64'
					onSubmit={form.handleSubmit(onSubmit)}
				>
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

					{/* Confirm Password */}
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type='password'
										placeholder='Confirm password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Name */}
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='Name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* E-mail */}
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='E-mail' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Mobile */}
					<FormField
						control={form.control}
						name='mobile'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder='Mobile phone' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Submit Button */}
					<Button className='w-24' type='submit'>Submit</Button>
				</form>
			</Form>
		</Card>
	);
}

export default CreateUserForm;
