import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
	const { username, password } = await request.json();
  
  if (username === 'admin' && password === 'secret') {
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  }
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
}
