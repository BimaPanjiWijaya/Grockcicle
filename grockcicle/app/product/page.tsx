export default async function ProductPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const filters = (await searchParams).category || "All Products";
  console.log("filters:", filters);
  return (
    <main className="flex-1">
      <h1 className="text-2xl font-bold mb-4">{filters}</h1>
      <p>
        Explore our collection of drinkware products, including mugs, tumblers,
        and more!
      </p>
    </main>
  );
}
