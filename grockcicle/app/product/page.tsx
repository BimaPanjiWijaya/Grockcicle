import ProductList from "@/components/ProductList";
import { Product } from "@/types";

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const res = await fetch("http://localhost:3001/product", {
    cache: "no-store",
  });
  const product: Product[] = await res.json();
  const filters = (await searchParams).category || "All Products";
  console.log("filters:", filters);
  return (
    <main className="flex-1">
      <ProductList products={product} />
    </main>
  );
}
