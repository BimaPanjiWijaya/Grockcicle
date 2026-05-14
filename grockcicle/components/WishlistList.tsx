"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import WishlistRemove from "@/components/WishlistRemove";

type Props = {
  wishlist: Product[];
  onRemove: (id: number) => void;
};

export default function WishlistList({ wishlist, onRemove }: Props) {
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-gray-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        </svg>
        <p className="text-sm text-gray-400">Your wishlist is empty.</p>
        <Link
          href="/product"
          className="mt-2 rounded-lg bg-gray-900 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-gray-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {wishlist.map((product) => (
        <div key={product.id} className="group flex flex-col">
          <Link href={`/product/${product.slug}`} className="block">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f5f2ee]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          </Link>
          <div className="mt-3 flex flex-col gap-1 px-1">
            <Link href={`/product/${product.slug}`}>
              <p className="line-clamp-2 text-xs font-semibold uppercase tracking-widest text-gray-900 underline-offset-2 hover:underline">
                {product.name}
              </p>
            </Link>
            <p className="text-xs text-gray-400">{product.description}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm font-bold text-gray-900">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
              <WishlistRemove product={product} onRemove={onRemove} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
