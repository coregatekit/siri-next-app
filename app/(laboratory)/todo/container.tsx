'use client';

import React from 'react';
import useTodo from '@/app/hooks/use-todo';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
	AlertDialogCancel,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

function TodoContainer() {
	const router = useRouter();
	const { todos, loading, markAsDone, deleteTodo } = useTodo();

	if (loading) {
		return (
			<div className='flex justify-center items-center mt-8'>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<div className='flex flex-col items-stretch justify-center mt-8'>
			<div className='flex justify-between items-center px-12'>
				<h1 className='text-3xl font-bold text-slate-700'>Todo list</h1>
				<Button
					className='cursor-pointer hover:bg-slate-700'
					onClick={() => router.push('/todo/create')}
				>
					Create new
				</Button>
			</div>
			<div className='mt-6 flex flex-col'>
				{todos.length === 0 ? (
					<p>No todos available</p>
				) : (
					todos.map((todo) => (
						<div
							key={todo.id}
							className='flex justify-between items-center px-12 p-4 border-b border-gray-300 cursor-pointer hover:bg-slate-100'
						>
							<div
								className={cn(
									'flex flex-row gap-4 justify-center items-center',
									todo.done ? 'opacity-50 line-through' : 'opacity-100',
								)}
							>
								<span className='text-lg font-bold text-slate-700'>
									{todo.title}
								</span>
								<span className='text-slate-500'>{todo.description}</span>
							</div>

							{/* Action */}
							<div className='flex flex-row gap-4'>
								{/* Mark as Done */}
								{todo.done ? null : (
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<Button
												variant='outline'
												className='cursor-pointer hover:bg-green-100'
											>
												Mark as Done
											</Button>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure you want to mark this todo as done?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This will mark your todo as done.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel className='cursor-pointer'>
													Cancel
												</AlertDialogCancel>
												<AlertDialogAction
													className='cursor-pointer'
													onClick={() => markAsDone(todo.id)}
												>
													Confirm
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								)}

								{/* Delete */}
								<AlertDialog>
									<AlertDialogTrigger asChild>
										<Button
											variant='outline'
											className='cursor-pointer hover:bg-red-100'
										>
											Delete
										</Button>
									</AlertDialogTrigger>
									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>
												Are you sure you want to delete this todo?
											</AlertDialogTitle>
											<AlertDialogDescription>
												This action cannot be undone. This will permanently
												delete your todo.
											</AlertDialogDescription>
										</AlertDialogHeader>
										<AlertDialogFooter>
											<AlertDialogCancel className='cursor-pointer'>
												Cancel
											</AlertDialogCancel>
											<AlertDialogAction
												className='cursor-pointer'
												onClick={() => deleteTodo(todo.id)}
											>
												Confirm
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default TodoContainer;
