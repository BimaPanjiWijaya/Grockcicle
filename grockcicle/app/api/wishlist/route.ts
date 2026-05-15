import WishlistModel from "@/db/models/WishlistModel";
import errorHandler from "@/helpers/errorHandler";

export async function GET(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { status: 401, message: "Unauthorized" };

    const wishlists = await WishlistModel.getWishlistByUserId(userId);
    return Response.json(wishlists);
  } catch (err) {
    return errorHandler(err);
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { status: 401, message: "Unauthorized" };

    const { productId } = await request.json();
    await WishlistModel.add(userId, productId);
    return Response.json({ message: "Product added to wishlist" });
  } catch (err) {
    return errorHandler(err);
  }
}

export async function DELETE(request: Request) {
  try {
    const userId = request.headers.get("x-user-id");
    if (!userId) throw { status: 401, message: "Unauthorized" };

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) throw { status: 400, message: "Missing wishlist id" };

    await WishlistModel.remove(id, userId);
    return Response.json({ message: "Product removed from wishlist" });
  } catch (err) {
    return errorHandler(err);
  }
}
