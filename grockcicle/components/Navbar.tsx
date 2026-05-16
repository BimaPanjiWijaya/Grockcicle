import Link from "next/link";
import NavbarMobileMenu from "@/components/NavbarMobileMenu";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import UserModel from "@/db/models/UserModel";
import LogoutButton from "@/components/LogoutButton";

const navLinks = [
  { label: "Drinkware", href: "/product?category=drinkware" },
  { label: "Bags", href: "/product?category=bags" },
  { label: "Barware & Coffee", href: "/product?category=barware" },
  { label: "Collabs", href: "/product?category=collabs" },
  { label: "New Arrivals", href: "/product?category=new-arrivals" },
  { label: "Best Sellers", href: "/product?category=best-sellers" },
];

async function getLoggedInUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("Authorization")?.value?.split(" ")[1];
    if (!token) return null;
    const { userId } = verify(token, process.env.SECRET_KEY!) as {
      userId: string;
    };
    return await UserModel.findById(userId);
  } catch {
    return null;
  }
}

export default async function Navbar() {
  const user = await getLoggedInUser();

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-widest uppercase text-white"
        >
          Grockcicle.
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden md:block text-sm text-gray-300">
              Hi, <span className="font-semibold text-white">{user.name}</span>
            </span>
          )}

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </Link>

          <LogoutButton isLoggedIn={!!user} />

          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
