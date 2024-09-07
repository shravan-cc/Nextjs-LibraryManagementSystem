import { z } from "zod";

export const requestTransactionBaseSchema = z.object({
  memberId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  bookId: z
    .number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive integer" }),
  requestDate: z.string(),
});

export const requestTransactionSchema = requestTransactionBaseSchema.extend({
  status: z.string(),
});

export type TransactionRequestBase = z.infer<
  typeof requestTransactionBaseSchema
>;
export type TransactionRequest = z.infer<typeof requestTransactionSchema>;
