import { z } from 'zod';

type TodoFormState =
	| {
			errors?: {
				title?: string[];
        descriptions?: string[];
			};
			message?: string;
	  }
	| undefined;

const CreateTodoFormSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(100, { message: 'Title must be less than 100 characters' })
		.regex(/^[a-zA-Z0-9\s]*$/, {
			message: 'Title must not contain special characters',
		}),
	description: z
		.string()
		.max(255, { message: 'Description must be less than 255 characters' })
		.optional(),
});

export type { TodoFormState };
export { CreateTodoFormSchema };
