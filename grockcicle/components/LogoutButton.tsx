"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
      >
        Logout
      </button>
    );
  }

  return (
    <a
      href="/login"
      className="text-sm font-semibold text-gray-300 hover:text-white transition-colors"
    >
      Login
    </a>
  );
}
