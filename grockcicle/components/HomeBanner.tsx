import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image:
      "https://corkcicle.com/cdn/shop/files/2241GCM-1.png?v=1773346877&width=1920",
    eyebrow: "New Arrivals",
    headline: "Built for the\nAdventure Ahead",
    cta: { label: "Shop New Arrivals", href: "/products?category=new-arrivals" },
    align: "left" as const,
    bg: "#e8e4dc",
  },
  {
    image:
      "https://corkcicle.com/cdn/shop/files/92S-W25-L-01.png?v=1771358052&width=1920",
    eyebrow: "Bags & Coolers",
    headline: "Carry Your\nDrinks in Style",
    cta: { label: "Shop Bags", href: "/products?category=bags" },
    align: "right" as const,
    bg: "#d6cfc4",
  },
  {
    image:
      "https://corkcicle.com/cdn/shop/files/2516GCM-2.png?v=1776450061&width=1920",
    eyebrow: "Best Sellers",
    headline: "Your Everyday\nFavorites",
    cta: { label: "Shop Best Sellers", href: "/products?category=best-sellers" },
    align: "left" as const,
    bg: "#ede8e0",
  },
];

export default function HomeBanner() {
  const slide = slides[0];

  return (
    <section className="w-full overflow-hidden">
      <div
        className="relative flex min-h-[85vh] w-full flex-col md:flex-row"
        style={{ backgroundColor: slide.bg }}
      >
        <div
          className={`flex flex-1 flex-col justify-end pb-14 px-8 md:px-16 lg:px-24 pt-16 md:pt-0 z-10 ${
            slide.align === "right" ? "md:order-2" : "md:order-1"
          }`}
        >
          <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            {slide.eyebrow}
          </span>
          <h1 className="mb-6 whitespace-pre-line text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {slide.headline}
          </h1>
          <Link
            href={slide.cta.href}
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-900 underline-offset-4 hover:underline"
          >
            {slide.cta.label}
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

        <div
          className={`relative flex-1 min-h-[50vh] md:min-h-full ${
            slide.align === "right" ? "md:order-1" : "md:order-2"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            priority
            className="object-contain object-center p-8 md:p-12"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="w-full bg-gray-900 py-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
          come on spend your money on&nbsp;
          <span className="text-amber-300">GROCKCICLE</span>
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Find Your Grockcicle
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors"
          >
            Shop All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Drinkware",
              href: "/products?category=drinkware",
              image:
                "https://corkcicle.com/cdn/shop/files/2116PME-1.png?v=1772722773&width=448",
              bg: "#f0ece4",
            },
            {
              label: "Bags",
              href: "/products?category=bags",
              image:
                "https://corkcicle.com/cdn/shop/files/92S-W25-L-01.png?v=1771358052&width=448",
              bg: "#e8e2d8",
            },
            {
              label: "Barware & Coffee",
              href: "/products?category=barware",
              image:
                "https://corkcicle.com/cdn/shop/files/2817PME-01.png?v=1768337577&width=448",
              bg: "#ede7dd",
            },
            {
              label: "Collabs",
              href: "/products?category=collabs",
              image:
                "https://corkcicle.com/cdn/shop/files/RP2222MCPH_hero_7acf7745-eb71-4e37-84f5-078fb2ae496a.png?v=1775577498&width=448",
              bg: "#e4ddd4",
            },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col overflow-hidden rounded"
              style={{ backgroundColor: cat.bg }}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-900">
                  {cat.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
