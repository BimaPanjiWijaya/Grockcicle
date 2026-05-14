import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import ProductSearch from "@/components/ProductSearch";
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
  const { category, q } = await searchParams;
  const categoryValue = typeof category === "string" ? category : "";
  const queryValue = typeof q === "string" ? q : "";

  const params = new URLSearchParams();
  if (categoryValue) params.set("category", categoryValue);
  if (queryValue) params.set("name_like", queryValue);

  const url = `http://localhost:3000/api/product?${params.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  const { items: products } = await res.json();
  console.log("Fetched products:", products);

  const pageTitle = categoryLabels[categoryValue] ?? "All Products";

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {products.length} products
            </p>
          </div>
          <Suspense>
            <ProductSearch />
          </Suspense>
        </div>
      </div>
      <ProductList products={products} />
    </main>
  );
}
