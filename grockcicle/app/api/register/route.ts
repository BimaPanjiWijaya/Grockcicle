import UserModel from "@/db/models/UserModel";
import errorHandler from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newUser = await UserModel.create({
      name: body.name,
      username: body.username,
      email: body.email,
      password: body.password,
    });
    return Response.json(
      { message: "Account created successfully", data: newUser },
      { status: 201 },
    );
  } catch (error) {
    return errorHandler(error);
  }
}
