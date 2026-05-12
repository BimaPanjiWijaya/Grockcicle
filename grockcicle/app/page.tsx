import HomeBanner from "@/components/HomeBanner";
import HomeDetailInfo from "@/components/HomeDetailInfo";
import HomeProductFeatured from "@/components/HomeProductFeatured";

export default function Home() {
  return (
    <main className="flex-1">
      <HomeBanner />
      <HomeDetailInfo />
      <HomeProductFeatured />
    </main>
  );
}
