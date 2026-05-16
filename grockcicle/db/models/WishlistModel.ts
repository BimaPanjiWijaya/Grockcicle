import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";
import { z } from "zod";

const WishlistSchema = z.object({
  userId: z.instanceof(ObjectId, { message: "userId is required" }),
  productId: z.instanceof(ObjectId, { message: "productId is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

class WishlistModel {
  static collection() {
    return database.collection("wishlists");
  }
  static async getWishlistByUserId(userId: string) {
    return await this.collection()
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
      ])
      .toArray();
  }

  static async add(userId: string, productId: string) {
    const data = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    WishlistSchema.parse(data);

    const existing = await this.collection().findOne({
      userId: data.userId,
      productId: data.productId,
    });
    if (existing) {
      throw { status: 400, message: "Product already in wishlist" };
    }

    return await this.collection().insertOne(data);
  }

  static async remove(wishlistId: string, userId: string) {
    const result = await this.collection().deleteOne({
      _id: new ObjectId(wishlistId),
      userId: new ObjectId(userId),
    });
    if (result.deletedCount === 0) {
      throw { status: 404, message: "Whishlist item  not found" };
    }
    return result;
  }
}

export default WishlistModel;
