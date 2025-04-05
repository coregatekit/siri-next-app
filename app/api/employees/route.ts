import prisma from '@/lib/prisma';
import { EmployeeService } from '@/services/employees';
import { EncryptionService } from '@/services/encryptions';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, response: NextResponse) {
	try {
		const employeeService = new EmployeeService(
			prisma,
			new EncryptionService(),
		);
		const employees = await employeeService.getAllEmployees();
		return NextResponse.json(employees, { status: 200 });
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
