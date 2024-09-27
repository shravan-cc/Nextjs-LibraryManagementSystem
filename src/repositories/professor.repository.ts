import "dotenv/config";
import {
  and,
  count,
  eq,
  like,
  or,
  asc,
  desc,
  ilike,
  gte,
  lte,
} from "drizzle-orm";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { IPageRequest, IPagedResponse } from "./pagination.response";
import { IRepository } from "./repository";
import { IBook, IBookBase } from "@/models/book.model";
import { BookTable, ProfessorsTable } from "../drizzle/schema";
import { BookTableColumns } from "@/lib/definition";
import { IProfessor, IProfessorBase } from "@/models/professor.model";

export class ProfessorRepository {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IProfessorBase) {
    try {
      const newProfessor: Omit<IProfessor, "id"> = {
        ...data,
      };
      const [queryResult] = await this.db
        .insert(ProfessorsTable)
        .values(newProfessor)
        .returning({ id: ProfessorsTable.id });
      const [insertedProfessor] = await this.db
        .select()
        .from(ProfessorsTable)
        .where(eq(ProfessorsTable.id, queryResult.id));

      if (!insertedProfessor) {
        throw new Error("Failed to retrive the newly inserted Professor");
      }
      return insertedProfessor!;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
  }
  async getProfessorByEmail(email: string) {
    try {
      const [result] = await this.db
        .select()
        .from(ProfessorsTable)
        .where(eq(ProfessorsTable.email, email));

      return (result as IProfessor) || null;
    } catch (e: any) {
      throw new Error(`Getting Professor Failed: ${e.message}`);
    }
  }
}
