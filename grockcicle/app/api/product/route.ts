import ProductModel from "@/db/models/ProductModel";

export async function GET() {
  const products = await ProductModel.GetAllProducts();
  return Response.json(products);
}
