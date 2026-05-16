"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setTotal(0);
    fetchProducts(1, true);
  }, [category, q]);

  async function fetchProducts(pageNum: number, reset = false) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("name_like", q);
    params.set("page", String(pageNum));
    params.set("limit", String(LIMIT));

    const res = await fetch(`/api/product?${params.toString()}`);
    const { items, meta } = await res.json();

    setProducts((prev) => (reset ? items : [...prev, ...items]));
    setHasMore(pageNum < meta.totalPages);
    setTotal(meta.total);
  }

  function loadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
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

      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={
          <p className="py-6 text-center text-xs text-gray-400 uppercase tracking-widest">
            Loading...
          </p>
        }
        endMessage={
          products.length > 0 ? (
            <p className="py-6 text-center text-xs text-gray-400 uppercase tracking-widest">
              All products loaded
            </p>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center">
              <p className="text-sm text-gray-400">No products found.</p>
            </div>
          )
        }
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
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
      </InfiniteScroll>
    </div>
  );
}
