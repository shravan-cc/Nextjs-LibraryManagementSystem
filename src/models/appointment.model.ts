import { z } from "zod";

export const AppointmentBaseSchema = z.object({
  professorId: z
    .number()
    .int()
    .positive("Professor ID must be a positive integer"),
  memberId: z.number().int().positive("Member ID must be a positive integer"),
  appointMentStartTime: z
    .string()
    .max(100, "Start time must be at most 100 characters"),
  appointMentEndTime: z
    .string()
    .max(100, "End time must be at most 100 characters"),
  googleMeetLink: z
    .string()
    .url("Invalid URL format")
    .max(255, "Google Meet link must be at most 255 characters")
    .optional(),
});

export const AppointmentSchema = AppointmentBaseSchema.extend({
  id: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  status: z.string(),
});

export type IAppointmentBase = z.infer<typeof AppointmentBaseSchema>;
export type IAppointment = z.infer<typeof AppointmentSchema>;
