import { Card } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import React from 'react';
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
	return (
		<Card className='w-full h-full p-4'>
			<h1 className='text-xl'>Create a new user</h1>
			{/* <Form>
				<form>
					<div>
						<FormField />
					</div>
				</form>
			</Form> */}
		</Card>
	);
}

export default CreateUserForm;
