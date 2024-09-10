import { MySql2Database } from "drizzle-orm/mysql2";
import { BookTable, TransactionTable } from "../drizzle/schema";
import { and, count, eq } from "drizzle-orm";
import { ITransactionRepository } from "./repository";
import { ITransaction, ITransactionBase } from "@/models/transaction.model";
import { IPagedResponse, IPageRequest } from "./pagination.response";
import { PageOption } from "@/lib/definition";
import { IBook } from "@/models/book.model";

export class TransactionRepository
  implements ITransactionRepository<ITransactionBase, ITransaction>
{
  constructor(private readonly db: MySql2Database<Record<string, unknown>>) {}

  async create(data: {
    memberId: number;
    bookId: number;
  }): Promise<ITransaction> {
    try {
      console.log("Creating transaction");
      const transaction = {
        ...data,
        status: "pending",
      };

      const [result] = await this.db
        .insert(TransactionTable)
        .values(transaction)
        .$returningId();
      const [insertedTransaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, result.id));
      //const insertedTransaction = await this.getById(result.insertId);
      // const [bookDetails] = await this.db
      //   .select()
      //   .from(BookTable)
      //   .where(eq(BookTable.id, insertedTransaction.bookId));

      // await this.db
      //   .update(BookTable)
      //   .set({ availableCopies: bookDetails.availableCopies - 1 })
      //   .where(eq(BookTable.id, bookDetails.id));

      if (!insertedTransaction) {
        throw new Error("Failed to retrieve the newly inserted transaction");
      }
      return insertedTransaction as ITransaction;
    } catch (error: any) {
      throw new Error(`Insertion failed: ${error.message}`);
    }
  }

  async issueBook(id: number) {
    try {
      const [transaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, id));

      const [bookDetails] = await this.db
        .select()
        .from(BookTable)
        .where(eq(BookTable.id, transaction.bookId));

      await this.db
        .update(BookTable)
        .set({ availableCopies: bookDetails.availableCopies - 1 })
        .where(eq(BookTable.id, bookDetails.id));

      return bookDetails;
    } catch (error: any) {
      throw new Error(`Failure in issuing book: ${error.message}`);
    }
  }

  async delete(id: number): Promise<ITransaction | null> {
    try {
      const existingTransaction = await this.getById(id);
      if (!existingTransaction) {
        return null;
      }
      await this.db.delete(TransactionTable).where(eq(TransactionTable.id, id));
      return existingTransaction;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<ITransaction | null> {
    try {
      const [result] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, id));
      return (result as ITransaction) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async update(
    transactionId: number,
    returnDate: string
  ): Promise<ITransaction | null> {
    try {
      await this.db
        .update(TransactionTable)
        .set({ returnDate: returnDate, status: "Returned" })
        .where(
          and(
            eq(TransactionTable.id, transactionId),
            eq(TransactionTable.status, "approved")
          )
        );
      const [updatedTransaction] = await this.db
        .select()
        .from(TransactionTable)
        .where(eq(TransactionTable.id, transactionId));

      const [bookDetails] = await this.db
        .select()
        .from(BookTable)
        .where(eq(BookTable.id, updatedTransaction.bookId));
      console.log(bookDetails);

      await this.db
        .update(BookTable)
        .set({ availableCopies: bookDetails.availableCopies + 1 })
        .where(eq(BookTable.id, bookDetails.id));

      if (!updatedTransaction) {
        throw new Error("Failed to retrieve the newly updated transaction");
      }
      console.log(updatedTransaction);
      return updatedTransaction as ITransaction;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest): Promise<IPagedResponse<ITransaction>> {
    try {
      const pageOpts: PageOption = {
        offset: params.offset,
        limit: params.limit,
      };

      const transactions = await this.db
        .select()
        .from(TransactionTable)
        .limit(params.limit)
        .offset(params.offset);

      const [totalTransactionRows] = await this.db
        .select({ count: count() })
        .from(TransactionTable);

      const totalTransaction = totalTransactionRows.count;
      return {
        items: transactions as ITransaction[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalTransaction,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing Transactions failed: ${e.message}`);
    }
  }
}
