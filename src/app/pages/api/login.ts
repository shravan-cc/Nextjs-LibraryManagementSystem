import { MemberRepository } from "@/repositories/member.repository";
import bcrypt from "bcrypt";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { NextApiRequest, NextApiResponse } from "next";
import { AppEnvs } from "../../../../read-env";

// Initialize database connection and repository
const pool = mysql.createPool(AppEnvs.DATABASE_URL);
const db: MySql2Database<Record<string, never>> = drizzle(pool);
const memberRepo = new MemberRepository(db);

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await memberRepo.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handleLogin;
