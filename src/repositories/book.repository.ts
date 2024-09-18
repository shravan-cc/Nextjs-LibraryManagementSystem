import "dotenv/config";
import { and, count, eq, like, or, asc, desc } from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { IPageRequest, IPagedResponse } from "./pagination.response";
import { IRepository } from "./repository";
import { IBook, IBookBase } from "@/models/book.model";
import { BookTable } from "../drizzle/schema";
import { BookTableColumns } from "@/lib/definition";

export class BookRepository implements IRepository<IBookBase, IBook> {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IBookBase): Promise<IBook> {
    try {
      const newBookdata: Omit<IBook, "id"> = {
        ...data,
        availableCopies: data.totalCopies,
      };
      const [queryResult] = await this.db
        .insert(BookTable)
        .values(newBookdata)
        .returning({ id: BookTable.id });
      const [insertedBook] = await this.db
        .select()
        .from(BookTable)
        .where(eq(BookTable.id, queryResult.id));

      if (!insertedBook) {
        throw new Error("Failed to retrive the newly inserted Book");
      }
      return insertedBook;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
  }

  async update(id: number, data: IBookBase): Promise<IBook | null> {
    try {
      const existingBook = await this.getById(id);
      if (!existingBook) {
        return null;
      }

      const updatedBook: IBook = {
        ...existingBook,
        ...data,
        availableCopies: data.totalCopies,
      };

      await this.db
        .update(BookTable)
        .set(updatedBook)
        .where(eq(BookTable.id, id));

      const editedBook = await this.getById(id);
      if (!editedBook) {
        throw new Error("Failed to retrieve the updated book");
      }
      return editedBook;
    } catch (e: any) {
      throw new Error(`Update failed: ${e.message}`);
    }
  }

  async delete(id: number): Promise<IBook | null> {
    try {
      const existingBook = await this.getById(id);
      if (!existingBook) {
        return null;
      }
      await this.db.delete(BookTable).where(eq(BookTable.id, id));
      return existingBook;
    } catch (e: any) {
      throw new Error(`Deletion failed: ${e.message}`);
    }
  }

  async getById(id: number): Promise<IBook | null> {
    try {
      const [result] = await this.db
        .select()
        .from(BookTable)
        .where(eq(BookTable.id, id));
      return (result as IBook) || null;
    } catch (e: any) {
      throw new Error(`Selection failed: ${e.message}`);
    }
  }

  async checkBookAvailability(id: number): Promise<boolean> {
    try {
      const existingBook = await this.getById(id);
      if (existingBook && existingBook.availableCopies > 0) {
        return true;
      }
      return false;
    } catch (e: any) {
      throw new Error(`Handling book failed: ${e.message}`);
    }
  }

  async getByIsBnNo(isbnNo: string): Promise<IBook | null> {
    try {
      const [result] = await this.db
        .select()
        .from(BookTable)
        .where(eq(BookTable.isbnNo, isbnNo));

      return (result as IBook) || null;
    } catch (e: any) {
      throw new Error(`Selection by isbnNo failed: ${e.message}`);
    }
  }

  async list(params: IPageRequest): Promise<IPagedResponse<IBook>> {
    try {
      const search = params.search?.toLowerCase();
      const genre = params.genre?.toLowerCase();
      const sortBy: BookTableColumns =
        (params.sort?.sortValue as BookTableColumns) || "id";
      const sortAs = params.sort?.sortAs as "asc" | "desc";
      const orderParameter =
        sortAs === "desc" ? desc(BookTable[sortBy]) : asc(BookTable[sortBy]);

      const whereExpression = and(
        search
          ? or(
              like(BookTable.title, `%${search}%`),
              like(BookTable.isbnNo, `%${search}%`)
            )
          : undefined,
        genre ? eq(BookTable.genre, genre) : undefined
      );

      let books = await this.db
        .select()
        .from(BookTable)
        .where(whereExpression)
        .orderBy(orderParameter)
        .limit(params.limit)
        .offset(params.offset)
        .execute();

      // if (sortBy === "title") {
      //   books.sort((a, b) => a.title.localeCompare(b.title));
      // }
      // if (sortBy === "author") {
      //   books.sort((a, b) => a.author.localeCompare(b.author));
      // }
      // if (sortBy === "availableCopies") {
      //   books.sort((a, b) => b.availableCopies - a.availableCopies);
      // }

      const result = await this.db
        .select({ count: count() })
        .from(BookTable)
        .where(whereExpression);

      const totalCount = result[0].count;

      return {
        items: books as IBook[],
        pagination: {
          offset: params.offset,
          limit: params.limit,
          total: totalCount,
        },
      };
    } catch (e: any) {
      throw new Error(`Listing books failed: ${e.message}`);
    }
  }
}
