import ProductModel from "@/db/models/ProductModel";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 50));
  const category = searchParams.get("category");
  const nameLike = searchParams.get("name_like");

  const filter: Record<string, any> = {};
  if (category) filter.category = category;
  if (nameLike) filter.name = { $regex: nameLike, $options: "i" };

  const { items, total } = await ProductModel.ProductPagination(
    filter,
    page,
    limit,
  );

  return Response.json({
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
