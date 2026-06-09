import errorHandler from "@/helpers/errorHandler";
import { z } from "zod";
import UserModel from "@/db/models/UserModel";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  email: z.email("Invalid Email Address").min(1),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    LoginSchema.parse(body);

    const { email: rawEmail, password } = body;
    const email = String(rawEmail || "").trim();
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw { message: "Invalid email or password", status: 401 };
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const token = sign({ userId: user._id }, process.env.SECRET_KEY || "");

    const cookieStore = await cookies();
    cookieStore.set("Authorization", `Bearer ${token}`);

    return Response.json({ token });
  } catch (error) {
    return errorHandler(error);
  }
}
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
  return Response.json({ message: "Logged out" });
}
