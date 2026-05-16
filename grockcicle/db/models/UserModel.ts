import { database } from "../config/mongodb";
import { z } from "zod";
import { hashSync } from "bcryptjs";
import { ObjectId } from "mongodb";

interface NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema = z.object({
  email: z.email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters Long"),
  username: z.string().min(3, "Username must be at least 3 characters Long"),
  name: z.string().min(1, "Name is reequired"),
});

class UserModel {
  static collection() {
    return database.collection("users");
  }
  static async create(newUser: NewUser) {
    UserSchema.parse(newUser);
    const existingUser = await this.collection().findOne({
      email: newUser.email,
    });
    if (existingUser) {
      throw { message: "Email already in use", status: 400 };
    }
    newUser.password = hashSync(newUser.password, 10);
    await this.collection().insertOne(newUser);
    return newUser;
  }
  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }
  static async findById(id: string) {
    return await this.collection().findOne({ _id: new ObjectId(id) });
  }
}

export default UserModel;
