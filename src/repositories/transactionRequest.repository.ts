import { MySql2Database } from "drizzle-orm/mysql2";
import { RequestTransactionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export class TransactionRequestRepository {
  constructor(private readonly db: MySql2Database<Record<string, unknown>>) {}

  async create(data: {
    memberId: number;
    bookId: number;
    requestDate: string;
  }) {
    const insertingData = {
      ...data,
      status: "pending",
    };
    try {
      const [insertedRequestTransaction] = await this.db
        .insert(RequestTransactionTable)
        .values(insertingData)
        .$returningId();
    } catch (error) {
      throw new Error("Failed to create request");
    }
  }

  async getTransactionRequestDetails(id: number) {
    try {
      console.log("In getTransaction Details");
      const [requestedTransaction] = await this.db
        .select()
        .from(RequestTransactionTable)
        .where(eq(RequestTransactionTable.id, id));
      return requestedTransaction;
    } catch (error) {
      throw new Error("Failed to fetch the requested transaction");
    }
  }
}
