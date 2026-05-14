"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import ProductAddWishlist from "@/components/ProductAddwishlist";

type Props = {
  category?: string;
  q?: string;
};

const LIMIT = 8;

export default function ProductInfiniteScroll({
  category = "",
  q = "",
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setTotal(0);
  }, [category, q]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("name_like", q);
    params.set("page", String(page));
    params.set("limit", String(LIMIT));

    setLoading(true);
    fetch(`/api/product?${params.toString()}`)
      .then((res) => res.json())
      .then(({ items, meta }) => {
        setProducts((prev) => (page === 1 ? items : [...prev, ...items]));
        setHasMore(page < meta.totalPages);
        setTotal(meta.total);
      })
      .finally(() => setLoading(false));
  }, [category, q, page]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  if (!loading && products.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-gray-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-900">{products.length}</span>{" "}
          of <span className="font-semibold text-gray-900">{total}</span>{" "}
          products
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group flex flex-col"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f5f2ee]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 px-1">
              <p className="line-clamp-2 text-xs font-semibold uppercase tracking-widest text-gray-900 underline-offset-2 group-hover:underline">
                {product.name}
              </p>
              <p className="text-xs text-gray-400">{product.description}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm font-bold text-gray-900">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <ProductAddWishlist product={product} className="ml-2" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div ref={sentinelRef} className="py-6 flex justify-center">
        {loading && (
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Loading...
          </p>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            All products loaded
          </p>
        )}
      </div>
    </div>
  );
}
