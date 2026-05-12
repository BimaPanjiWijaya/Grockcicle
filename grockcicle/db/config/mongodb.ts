import { MongoClient } from "mongodb";
const uri = process.env.DB_CONNECTION_URI as string;

const client = new MongoClient(uri);
export const database = client.db("GROCKCICLE");
