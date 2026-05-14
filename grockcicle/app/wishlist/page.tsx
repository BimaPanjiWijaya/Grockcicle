"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import WishlistList from "@/components/WishlistList";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored: Product[] = JSON.parse(
      localStorage.getItem("wishlist") ?? "[]"
    );
    setWishlist(stored);
    setMounted(true);
  }, []);

  function removeFromWishlist(id: number) {
    const updated = wishlist.filter((p) => p.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  }

  if (!mounted) return null;

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
          </p>
        </div>

        <WishlistList wishlist={wishlist} onRemove={removeFromWishlist} />
      </div>
    </main>
  );
}
