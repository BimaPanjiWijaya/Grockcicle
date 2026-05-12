"use client";

import { Product } from "@/types";

type Props = {
  product: Product;
  onRemove: (id: number) => void;
  className?: string;
};

export default function WishlistRemove({ product, onRemove, className = "" }: Props) {
  return (
    <button
      onClick={() => onRemove(product.id)}
      aria-label={`Remove ${product.name} from wishlist`}
      className={`group flex items-center gap-2 transition-colors ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 fill-red-500 stroke-red-500 transition-all duration-200 group-hover:fill-none group-hover:stroke-gray-400"
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
        className={`text-xs font-semibold uppercase tracking-widest transition-colors text-red-500 group-hover:text-gray-400`}
      >
        Remove
      </span>
    </button>
  );
}
