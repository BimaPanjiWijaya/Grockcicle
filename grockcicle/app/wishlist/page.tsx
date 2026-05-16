"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Product } from "@/types";
import WishlistList from "@/components/WishlistList";

type WishlistItem = {
  _id: string;
  product: Product;
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/wishlist")
      .then((res) => {
        if (res.status === 401) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  async function removeFromWishlist(productId: string) {
    await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.product._id !== productId));
    toast.success("Removed from wishlist.");
  }

  if (loading) return null;

  const wishlist = items.map((i) => i.product);

  return (
    <main className="flex-1 min-h-[calc(100vh-64px)]">
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
