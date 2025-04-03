import prisma from '@/lib/prisma';
import { type NextRequest, NextResponse } from 'next/server';

import { EmployeeService } from '@/services/employees';
import { EncryptionService } from '@/services/encryptions';
import type { CreateEmployeeData } from '@/services/employees/interfaces';

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		const body = await request.json();
		const createEmployeeData: CreateEmployeeData = {
			username: body.username,
			password: body.password,
			name: body.name,
			email: body.email,
			mobile: body.mobile,
		};

		const employeeService = new EmployeeService(
			prisma,
			new EncryptionService(),
		);
		const newEmployee =
			await employeeService.createEmployee(createEmployeeData);

		return NextResponse.json(newEmployee, { status: 201 });
	} catch (error) {
		if (error instanceof Error) {
			if (
				error.message === 'Username already exists' ||
				error.message === 'Email already exists'
			) {
				return NextResponse.json({ error: error.message }, { status: 409 });
			}
		}
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 },
		);
	}
}
