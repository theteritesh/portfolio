import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHubActivity from "@/components/GitHubActivity";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface">
      <Navbar />
      <main className="w-full pt-16 flex flex-col flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity />
      </main>
    </div>
  );
}
