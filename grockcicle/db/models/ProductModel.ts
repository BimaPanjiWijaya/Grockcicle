import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }
  static async GetAllProducts() {
    const products = await this.collection().find().toArray();
    return products;
  }
  static async GetProductById(id: string) {
    const product = await this.collection().findOne({ _id: new ObjectId(id) });
    return product;
  }
}
