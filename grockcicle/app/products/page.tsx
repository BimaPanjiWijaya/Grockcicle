"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductInfiniteScroll from "@/components/ProductInfiniteScroll";
import ProductSearch from "@/components/ProductSearch";

const categoryLabels: Record<string, string> = {
  drinkware: "Drinkware",
  bags: "Bags",
  barware: "Barware & Coffee",
  collabs: "Collabs",
  "new-arrivals": "New Arrivals",
  "best-sellers": "Best Sellers",
};

function ProductContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const q = searchParams.get("q") ?? "";
  const pageTitle = categoryLabels[category] ?? "All Products";

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {pageTitle}
          </h1>
          <ProductSearch />
        </div>
      </div>
      <ProductInfiniteScroll category={category} q={q} />
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense>
      <ProductContent />
    </Suspense>
  );
}
