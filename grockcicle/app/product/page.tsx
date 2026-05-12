import ProductList from "@/components/ProductList";
import { Product } from "@/types";

const categoryLabels: Record<string, string> = {
  drinkware: "Drinkware",
  bags: "Bags",
  barware: "Barware & Coffee",
  collabs: "Collabs",
  "new-arrivals": "New Arrivals",
  "best-sellers": "Best Sellers",
};

export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const categoryValue = typeof category === "string" ? category : "";

  const url = categoryValue
    ? `http://localhost:3001/product?category=${categoryValue}`
    : `http://localhost:3001/product`;

  const res = await fetch(url, { cache: "no-store" });
  const products: Product[] = await res.json();

  const pageTitle = categoryLabels[categoryValue] ?? "All Products";

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {pageTitle}
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {products.length} products
        </p>
      </div>
      <ProductList products={products} />
    </main>
  );
}
