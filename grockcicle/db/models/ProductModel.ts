import { database } from "../config/mongodb";

class ProductModel {
  static collection() {
    return database.collection("products");
  }
  static async GetAllProducts(filter: Record<string, any> = {}) {
    const products = await this.collection().find(filter).toArray();
    return products;
  }
  static async GetProductBySlug(slug: string) {
    const products = await this.collection().findOne({ slug });
    return products;
  }
  static async ProductPagination(
    filter: Record<string, any> = {},
    page = 1,
    limit = 100,
  ) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.collection().find(filter).skip(skip).limit(limit).toArray(),
      this.collection().countDocuments(filter),
    ]);
    return { items, total };
  }
}

export default ProductModel;
