import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }
  static async GetAllProducts() {
    const products = await this.collection().find().toArray();
    return products;
  }
  static async GetProductBySlug(slug: string) {
    const products = await this.collection().findOne({ slug });
    return products;
  }
}

export default ProductModel;
