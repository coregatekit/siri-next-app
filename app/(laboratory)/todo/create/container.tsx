'use client';

import { createTodo } from '@/app/actions/todo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateTodoFormSchema } from '@/lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';

function CreateTodoContainer() {
	const form = useForm<z.infer<typeof CreateTodoFormSchema>>({
		resolver: zodResolver(CreateTodoFormSchema),
		defaultValues: {
			title: '',
			description: '',
		},
	});

	const handleSubmtit = async (data: z.infer<typeof CreateTodoFormSchema>) => {
		const result = await createTodo(data);
		if (!result.success) {
			toast.error(result.error);
			return;
		}
		form.reset();
		toast.success('Todo created successfully');
		redirect('/todo');
	};

	return (
		<div className='flex flex-col justify-center items-center gap-4 py-12'>
			<Card className='w-120 h-full p-8'>
				<h1 className='text-2xl font-bold text-slate-700'>Create Todo</h1>
				<Form {...form}>
					<form
						className='flex flex-col items-center justify-center gap-4 w-full'
						onSubmit={form.handleSubmit(handleSubmtit)}
					>
						{/* Title */}
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Input placeholder='Title' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormControl>
										<Textarea placeholder='Descriptions' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Submit Button */}
						<Button className='cursor-pointer' type='submit'>
							Submit
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}

export default CreateTodoContainer;
