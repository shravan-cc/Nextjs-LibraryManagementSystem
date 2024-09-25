import { z } from "zod";

export const ProfessorBaseSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name cannot be longer than 50 characters" }),
  bio: z
    .string()
    .max(255, { message: "Bio cannot be longer than 255 characters" })
    .optional(),
  department: z 
    .string()
    .max(50, { message: "Description cannot be longer than 50 characters" })
    .optional(),
  calendlylink: z
    .string()
    .max(255, {
      message: "Calendly link cannot be longer than 255 characters",
    }),
});

export const ProfessorSchema = ProfessorBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
});

export type IProfessorBase = z.infer<typeof ProfessorBaseSchema>;
export type IProfessor = z.infer<typeof ProfessorSchema>;
