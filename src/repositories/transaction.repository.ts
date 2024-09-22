import { PageOption } from "@/lib/definition";
import { ITransaction, ITransactionBase } from "@/models/transaction.model";
import { and, count, desc, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { BookTable, MemberTable, TransactionTable } from "../drizzle/schema";
import { IPagedResponse, IPageRequest } from "./pagination.response";
import { ITransactionRepository } from "./repository";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";

export class TransactionRepository
  implements ITransactionRepository<ITransactionBase, ITransaction>
{
  constructor(
    private readonly db: PostgresJsDatabase<Record<string, unknown>>
  ) {}

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
        .returning({ id: TransactionTable.id });
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

  async list(params: IPageRequest) {
    try {
      const pageOpts: PageOption = {
        offset: params.offset,
        limit: params.limit,
      };
      const search = params.search;
      const status = params.status;
      const dueDate = params.duetoday;
      console.log("DueDtae", dueDate);
      const whereExpression = and(
        status ? eq(TransactionTable.status, status) : undefined,
        dueDate ? eq(TransactionTable.dueDate, dueDate) : undefined,
        search ? eq(TransactionTable.id, Number(search)) : undefined
      );

      const transactions = await this.db
        .select({
          id: TransactionTable.id,
          bookId: TransactionTable.bookId,
          memberId: TransactionTable.memberId,
          borrowDate: TransactionTable.borrowDate,
          dueDate: TransactionTable.dueDate,
          status: TransactionTable.status,
          returnDate: TransactionTable.returnDate,
          title: BookTable.title,
          firstName: MemberTable.firstName,
          lastName: MemberTable.lastName,
        })
        .from(TransactionTable)
        .leftJoin(BookTable, eq(TransactionTable.bookId, BookTable.id))
        .leftJoin(MemberTable, eq(TransactionTable.memberId, MemberTable.id))
        .where(whereExpression)
        .orderBy(desc(TransactionTable.id))
        .limit(params.limit)
        .offset(params.offset);

      const [totalTransactionRows] = await this.db
        .select({ count: count() })
        .from(TransactionTable)
        .where(whereExpression);

      const totalTransaction = totalTransactionRows.count;
      return {
        items: transactions,
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
