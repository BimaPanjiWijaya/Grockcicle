import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";

async function getFeaturedProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/product?limit=8`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const { items } = await res.json();
  return items;
}

export default async function HomeProductFeatured() {
  const products = await getFeaturedProducts();
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
            Trending Now
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Hot This Season
          </h2>
        </div>
        <Link
          href="/products"
          className="text-xs font-semibold uppercase tracking-widest text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline transition-colors"
        >
          See All
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className="group flex flex-col shrink-0 w-52 md:w-60"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#f5f2ee]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                sizes="240px"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 px-1">
              <p className="line-clamp-2 text-xs font-semibold uppercase tracking-widest text-gray-900 underline-offset-2 group-hover:underline">
                {product.name}
              </p>
              <p className="line-clamp-2 text-xs text-gray-400">
                {product.excerpt}
              </p>
              <p className="text-sm font-bold text-gray-900">
                Rp {product.price.toLocaleString("id-ID")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
