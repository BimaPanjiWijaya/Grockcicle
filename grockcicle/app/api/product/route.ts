import ProductModel from "@/db/models/ProductModel";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const nameLike = searchParams.get("name_like");

  const filter: Record<string, any> = {};
  if (category) filter.category = category;
  if (nameLike) filter.name = { $regex: nameLike, $options: "i" };

  const products = await ProductModel.GetAllProducts(filter);
  return Response.json(products);
}
