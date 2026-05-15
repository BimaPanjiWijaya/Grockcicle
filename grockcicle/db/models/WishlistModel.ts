import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

class WishlistModel {
  static collection() {
    return database.collection("wishlists");
  }
  static async getWishlistByUserId(userId: string) {
    return await this.collection()
      .aggregate([
        { $match: { userId } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
          },
        },
        { $unwind: "$product" },
      ])
      .toArray();
  }

  static async add(userId: string, productId: string) {
    const existing = await this.collection().findOne({ userId, productId });
    if (existing) {
      throw { status: 400, message: "Product already in wishlist" };
    }
    const result = await this.collection().insertOne({
      userId,
      productId,
      createdAt: new Date(),
    });
    return result;
  }

  static async remove(wishlistId: string, userId: string) {
    const result = await this.collection().deleteOne({
      _id: new ObjectId(wishlistId),
      userId,
    });
    if (result.deletedCount === 0) {
      throw { status: 404, message: "Whishlist item  not found" };
    }
    return result;
  }
}

export default WishlistModel;
