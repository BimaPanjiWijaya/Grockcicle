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
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

class UserModel {
  static collection() {
    return database.collection("users");
  }

  static async create(newUser: NewUser) {
    UserSchema.parse(newUser);

    const existingEmail = await this.collection().findOne({
      email: newUser.email,
    });
    if (existingEmail) {
      throw { message: "Email already in use", status: 400 };
    }

    const existingUsername = await this.collection().findOne({
      username: newUser.username,
    });
    if (existingUsername) {
      throw { message: "Username already in use", status: 400 };
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
