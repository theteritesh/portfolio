import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="w-full pt-16 flex flex-col flex-1">
        <Hero />
      </main>
    </div>
  );
}
