import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import WishlistModel from "@/db/models/WishlistModel";
import errorHandler from "@/helpers/errorHandler";

async function getWishlistByUserId() {
  const cookieStore = await cookies();
  const token = cookieStore.get("Authorization")?.value?.split(" ")[1];
  if (!token) throw { status: 401, message: "Unauthorized" };
  const payload = verify(token, process.env.SECRET_KEY!) as { userId: string };
  return payload.userId;
}

export async function GET() {
  try {
    const userId = await getWishlistByUserId();
    const wishlist = await WishlistModel.getWishlistByUserId(userId);
    return Response.json(wishlist);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getWishlistByUserId();
    const { productId } = await request.json();
    const result = await WishlistModel.add(userId, productId);
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error);
  }
}
