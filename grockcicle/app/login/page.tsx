"use client";

import { useState, SubmitEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (!res.ok) {
        throw response;
      }
      alert("Login successful!");
    } catch (err: any) {
      alert(err.message || "An error occurred during login.");
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)]">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gray-900 px-16 py-14">
        <Link
          href="/"
          className="text-xl font-bold tracking-[0.2em] uppercase text-white"
        >
          Grockcicle
        </Link>
        <div>
          <p className="text-3xl font-bold leading-snug text-white">
            Welcome back.
            <br />
            Good to see you.
          </p>
          <p className="mt-4 text-sm text-gray-400 max-w-xs">
            Sign in to access your wishlist, track your orders, and discover the
            latest Grockcicle products.
          </p>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-xl">
          <Image
            src="https://corkcicle.com/cdn/shop/files/2516GCM-2.png?v=1776450061&width=1920"
            alt="Grockcicle products"
            fill
            className="object-contain object-center p-4"
            sizes="50vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-14">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 block text-center text-lg font-bold tracking-[0.2em] uppercase text-gray-900 lg:hidden"
          >
            Grockcicle
          </Link>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-gray-900 underline-offset-2 hover:underline"
            >
              Create one
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-widest text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-widest text-gray-700"
                >
                  Password
                </label>
                <span className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer transition-colors">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-11 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88 6.59 6.59m7.532 7.532 3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-gray-900 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-gray-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400">
            By signing in, you agree to our{" "}
            <span className="font-semibold text-gray-600">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-semibold text-gray-600">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </main>
  );
}
