import ProductModel from "@/db/models/ProductModel";
import errorHandler from "@/helpers/errorHandler";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const products = await ProductModel.GetProductBySlug(slug);

    if (!products) throw { status: 400, message: "Product not found" };

    return Response.json(products);
  } catch (error) {
    return errorHandler(error);
  }
}
