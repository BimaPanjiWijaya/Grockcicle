"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

type Props = {
  product: Product;
  className?: string;
};

export default function ProductAddWishlist({ product, className = "" }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        const found = data.find(
          (item: any) => item.product._id === product._id,
        );

        if (found) {
          setIsWishlisted(true);
        }
      });
  }, [product._id]);

  async function toggleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      await fetch(`/api/wishlist?productId=${product._id}`, { method: "DELETE" });
      setIsWishlisted(false);
    } else {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id }),
      });
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      setIsWishlisted(true);
    }
  }

  return (
    <button
      onClick={(e) => toggleWishlist(e)}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`group flex items-center gap-2 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 transition-all duration-200 ${
          isWishlisted
            ? "fill-red-500 stroke-red-500"
            : "fill-none stroke-gray-400 group-hover:stroke-red-400"
        }`}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        />
      </svg>
      <span
        className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
          isWishlisted
            ? "text-red-500"
            : "text-gray-400 group-hover:text-red-400"
        }`}
      >
        {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
      </span>
    </button>
  );
}
