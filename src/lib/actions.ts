'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from './prisma';

// Validation schema for the poll form
const CreatePollSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  question: z.string().min(1, { message: 'Question is required.' }),
  options: z
    .array(z.string())
    .min(2, { message: 'At least 2 options are required.' })
    .refine((options: string[]) => options.every((opt: string) => opt.length > 0), {
      message: 'All options must have text.',
    }),
});

export type PollState = {
  errors?: {
    title?: string[];
    question?: string[];
    options?: string[];
  };
  message?: string | null;
};

export async function createPoll(prevState: PollState, formData: FormData) {
  // Validate the form data
  const validatedFields = CreatePollSchema.safeParse({
    title: formData.get('title'),
    question: formData.get('question'),
    options: formData.getAll('options'),
  });

  // If form validation fails, return errors early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create poll.',
    };
  }

  const { title, question, options } = validatedFields.data;

  try {
    // Create the poll and its options in a transaction
    await prisma.$transaction(async (tx) => {
      const poll = await tx.poll.create({
        data: {
          title,
          question,
          options: {
            create: options.map((text: string) => ({
              text,
            })),
          },
        },
      });
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to create poll.',
    };
  }

  revalidatePath('/polls');
  redirect('/polls');
}
