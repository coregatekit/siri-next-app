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
