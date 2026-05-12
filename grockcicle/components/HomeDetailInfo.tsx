import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 2,
    name: "PURE TASTE MUG",
    slug: "pure-taste-mug",
    excerpt:
      "Ceramic-coated interior keeps every sip tasting clean — no metallic aftertaste, just pure flavor from the first pour to the last.",
    price: 908000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/2516PTWB-2.png?v=1773324771&width=1920",
    bg: "#f0ece4",
  },
  {
    id: 5,
    name: "SIERRA LEAKPROOF CRUISER",
    slug: "sierra-leakproof-cruiser",
    excerpt:
      "Built for the trail and the commute alike. Stays cold 25 hours, hot 12 — sealed tight so nothing leaks, ever.",
    price: 1167000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/2241RC-1.png?v=1776800289&width=1920",
    bg: "#e8e2d8",
  },
  {
    id: 6,
    name: "COLD CUP",
    slug: "cold-cup",
    excerpt:
      "Wide-mouth design for ice, smoothies, and everything in between. Triple insulation keeps it cold all day long.",
    price: 908000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/2224PPP-01.png?v=1773666527&width=1920",
    bg: "#ede7dd",
  },
  {
    id: 8,
    name: "EOLA BUCKET COOLER BAG",
    slug: "eola-bucket-bag",
    excerpt:
      "Roomy, insulated, and effortlessly cool. Pack your drinks, snacks, and go — the perfect companion for any adventure.",
    price: 3889000,
    thumbnail:
      "https://corkcicle.com/cdn/shop/files/90EB-W24-CLT-01-2.png?v=1773416460&width=1920",
    bg: "#e4ddd4",
  },
];

export default function HomeDetailInfo() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-16">
      <div className="mb-12 text-center">
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
          Our Best Sellers
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Distinct By Design™
        </h2>
      </div>

      <div className="space-y-6">
        {products.map((product, index) => {
          const isEven = index % 2 === 1;
          return (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl md:flex-row md:min-h-85"
              style={{ backgroundColor: product.bg }}
            >
              <div
                className={`relative min-h-65 flex-1 md:min-h-full ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-contain p-8 transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div
                className={`flex flex-1 flex-col justify-center px-8 py-10 md:px-14 lg:px-20 ${
                  isEven ? "md:order-1" : "md:order-2"
                }`}
              >
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                  Best Seller
                </span>
                <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                  {product.name}
                </h3>
                <p className="mb-6 max-w-md text-sm leading-relaxed text-gray-600">
                  {product.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-lg font-bold text-gray-900">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-900 underline-offset-4 hover:underline"
                  >
                    Shop Now
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
