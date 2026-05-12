import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "PITCHER",
    slug: "pitcher",
    description: "Oat Milk / 40oz",
    price: 2593000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/6764GOM-1.png?v=1773153948&width=448",
    badge: "New",
  },
  {
    id: 2,
    name: "VINNEBAGO",
    slug: "vinnebago",
    description: "Oat Milk / 25oz",
    price: 1297000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/5825GOM-2.png?v=1776450271&width=448",
    badge: null,
  },
  {
    id: 3,
    name: "HARRY POTTER LEAKPROOF CRUISER",
    slug: "harry-potter-leakproof-cruiser",
    description: "Hogwarts Express / 40oz",
    price: 1297000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/hogwartsexpress_hero_v3.png?v=1774979796&width=448",
    badge: "Collab",
  },
  {
    id: 4,
    name: "WHISKEY WEDGE",
    slug: "whiskey-wedge",
    description: "Clear Glass",
    price: 649000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/7001_071d66c4-2ccc-40ee-8a2c-99600b5bae48.png?v=1748377057&width=448",
    badge: null,
  },
];

export default function HomeProductFeatured() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-14">
      {/* Header */}
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
          href="/product"
          className="text-xs font-semibold uppercase tracking-widest text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline transition-colors"
        >
          See All
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {product.badge && (
                <span className="absolute left-3 top-3 rounded bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1 px-1">
              <p className="line-clamp-2 text-xs font-semibold uppercase tracking-widest text-gray-900 underline-offset-2 group-hover:underline">
                {product.name}
              </p>
              <p className="text-xs text-gray-400">{product.description}</p>
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
