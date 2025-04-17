'use client';

import { Button } from '@/components/ui/button';
import type { Todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function TodoContainer() {
	const router = useRouter();
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchTodos = async () => {
			setLoading(true);

			const response = await fetch('/api/todos');
			if (!response.ok) {
				throw new Error('Failed to fetch todos');
			}

			const data = await response.json();
			setTodos(data);
			setLoading(false);
		};

		fetchTodos().catch((error) => {
			console.error('Error fetching todos:', error);
			setLoading(false);
		});
	}, []);

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
							<div className='flex flex-row gap-4 justify-center items-center'>
								<span className='text-lg font-bold text-slate-700'>
									{todo.title}
								</span>
								<span className='text-slate-500'>{todo.description}</span>
							</div>
							{todo.done ?? <span>'✅'</span>}
							<Button variant='outline' className='cursor-pointer hover:bg-red-100'>
								Delete
							</Button>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default TodoContainer;
