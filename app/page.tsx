import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AssetClasses from "@/components/landing/AssetClasses";
import MarketTools from "@/components/landing/MarketTools";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117]">
      <Navbar />
      <Hero />
      <AssetClasses />
      <MarketTools />
      <Footer />
    </main>
  );
}
