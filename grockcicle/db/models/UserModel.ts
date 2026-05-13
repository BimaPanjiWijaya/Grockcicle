import { database } from "../config/mongodb";
import { z } from "zod";

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
  name: z.string().min(1, "Name is reequired")
});

class UserModel{
    static collection(){
        return database.collection("users");
    }
    static async create(newUser: NewUser){
        UserSchema.parse(newUser)
        await this.collection().insertOne(newUser)
        return newUser
    }
}

export default UserModel
