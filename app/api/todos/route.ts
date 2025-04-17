import { getTodoService } from '@/lib/service';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const todoService = getTodoService();
		const todos = await todoService.getTodos();

		return NextResponse.json(todos, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest, response: NextResponse) {
	try {
    const body = await request.json();

    const todoService = getTodoService();
    const todo = await todoService.createTodo(body);

    return NextResponse.json(todo, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}

export async function DELETE(request: NextRequest, response: NextResponse) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json(
				{ message: 'Todo id is required' },
				{ status: 400 },
			);
		}

		const todoService = getTodoService();
		await todoService.deleteTodo(id);

		return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
		return NextResponse.json(
			{ message: 'Internal server error' },
			{ status: 500 },
		);
	}
}
