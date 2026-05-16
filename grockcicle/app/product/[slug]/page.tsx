import Image from "next/image";
import { Product } from "@/types";
import { Metadata } from "next";
import ProductAddWishlist from "@/components/ProductAddwishlist";

async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:3000/api/product/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} - Grockcicle`,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [{ url: product.thumbnail }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-gray-400">Product not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#f5f2ee]">
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                priority
                className="object-contain p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f2ee]"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-contain p-3"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mb-1 text-sm text-gray-500">{product.description}</p>
            <p className="mb-6 text-2xl font-bold text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </p>

            <p className="mb-8 text-sm leading-relaxed text-gray-600">
              {product.excerpt}
            </p>

            <div className="flex flex-col gap-3">
              <button className="w-full rounded-lg bg-gray-900 py-3.5 text-sm font-semibold uppercase tracking-widest text-white hover:bg-gray-700 transition-colors">
                Add to Cart
              </button>
              <ProductAddWishlist
                product={product}
                className="justify-center py-3 rounded-lg border border-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>

            {product.tags?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {product.tags[0].split("-").map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 px-3 py-1 text-[11px] capitalize text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
