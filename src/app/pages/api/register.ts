import { db } from "@/lib/db";
import { IMemberBase } from "@/models/member.model";
import { MemberRepository } from "@/repositories/member.repository";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

const memberRepo = new MemberRepository(db);

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    firstName,
    lastName,
    phone,
    address,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (!firstName || !lastName || !phone || !address || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const existingUser = await memberRepo.getByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser: IMemberBase = {
      firstName,
      lastName,
      phone,
      address,
      role: "user",
      email,
      password: hashedPwd,
    };

    const createdUser = await memberRepo.create(newUser);

    res
      .status(201)
      .json({ message: `User ${createdUser.email} created successfully!` });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handleRegister;
