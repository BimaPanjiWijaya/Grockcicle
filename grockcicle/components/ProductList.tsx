import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import ProductAddWishlist from "@/components/ProductAddwishlist";

export default function ProductList({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-gray-400">No products found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
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
    </div>
  );
}
