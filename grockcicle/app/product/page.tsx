import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import ProductSearch from "@/components/ProductSearch";

export default function ProductPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-10 pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            All Products
          </h1>
          <Suspense>
            <ProductSearch />
          </Suspense>
        </div>
      </div>
      <Suspense>
        <ProductList />
      </Suspense>
    </main>
  );
}
