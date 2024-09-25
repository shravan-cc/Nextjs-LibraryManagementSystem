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
import { AppointmentsTable, BookTable } from "../drizzle/schema";
import {
  AppointmentBaseSchema,
  IAppointment,
  IAppointmentBase,
} from "../models/appointment.model";
import { BookTableColumns } from "@/lib/definition";

export class AppointmentRepository {
  constructor(private readonly db: VercelPgDatabase<Record<string, unknown>>) {}

  async create(data: IAppointmentBase) {
    try {
      const appointments: Omit<IAppointment, "id"> = {
        ...data,
        status: "scheduled",
      };
      const [queryResult] = await this.db
        .insert(AppointmentsTable)
        .values(appointments)
        .returning({ id: AppointmentsTable.id });
      const [insertedAppointment] = await this.db
        .select()
        .from(AppointmentsTable)
        .where(eq(AppointmentsTable.id, queryResult.id));

      if (!insertedAppointment) {
        throw new Error("Failed to retrive the newly appointment");
      }
      return insertedAppointment;
    } catch (e: any) {
      throw new Error(`Insertion failed: ${e.message}`);
    }
  }
}
