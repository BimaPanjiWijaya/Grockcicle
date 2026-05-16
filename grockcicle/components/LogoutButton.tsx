"use client";

import { handleLogout } from "@/actions";

export default function LogoutButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  async function onLogout() {
    await handleLogout();
    window.location.href = "/login";
  }

  if (isLoggedIn) {
    return (
      <button
        onClick={onLogout}
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
