import { type NextRequest, NextResponse } from 'next/server';

import type { CreateEmployeeData } from '@/services/employees/interfaces';
import { z } from 'zod';
import { getEmployeeService } from '@/lib/service';

const CreateUserFormSchema = z.object({
	username: z
		.string()
		.min(6, { message: 'Username must be at least 6 characters long' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' }),
	name: z
		.string()
		.min(2, { message: 'Name must be at least 2 characters long' }),
	email: z.string().email({ message: 'Invalid email address' }),
	mobile: z.string().optional(),
});

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();

		const validatedData = CreateUserFormSchema.parse(body);

		const createEmployeeData: CreateEmployeeData = {
			username: validatedData.username,
			password: validatedData.password,
			name: validatedData.name,
			email: validatedData.email,
			mobile: validatedData.mobile,
		};

		const employeeService = getEmployeeService();
		const newEmployee =
			await employeeService.createEmployee(createEmployeeData);

		return NextResponse.json(newEmployee, { status: 201 });
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ message: 'Validation error', errors: error.errors },
				{ status: 400 },
			);
		}

		if (error instanceof Error) {
			if (
				error.message === 'Username already exists' ||
				error.message === 'Email already exists'
			) {
				return NextResponse.json({ message: error.message }, { status: 409 });
			}
		}
		return NextResponse.json(
			{ message: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
