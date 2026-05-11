import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to Grockcicle!</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your one-stop shop for all things cool.
      </p>
      <Image
        src="/grockcicle-logo.png"
        alt="Grockcicle Logo"
        width={200}
        height={200}
        className="mb-8"
      />
      <a
        href="/home"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Explore Now
      </a>
    </div>
  );
}
