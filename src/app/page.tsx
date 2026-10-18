import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getGitHubData } from "@/lib/github";

// Dynamically import heavy below-the-fold components for optimal initial paint
const GitHubActivity = dynamic(() => import("@/components/GitHubActivity"), {
  ssr: true,
  loading: () => (
    <div className="w-full max-w-[1280px] mx-auto min-h-[400px] flex items-center justify-center font-mono text-[13px] text-outline p-8">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
        <span>Loading Git telemetry &amp; contribution heatmap...</span>
      </div>
    </div>
  ),
});

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: true,
  loading: () => (
    <div className="w-full max-w-[1280px] mx-auto min-h-[300px] flex items-center justify-center font-mono text-[13px] text-outline p-8">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
        <span>Loading review comments...</span>
      </div>
    </div>
  ),
});

export default async function Home() {
  const githubData = await getGitHubData();

  return (
    <div className="flex flex-col min-h-screen bg-surface text-on-surface overflow-x-hidden">
      <Navbar />
      <main id="main-content" className="w-full pt-16 flex flex-col flex-1 overflow-x-hidden">
        <Hero stats={githubData.stats} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubActivity
          data={githubData.activity}
          lastUpdated={githubData.lastUpdated}
          userUrl={githubData.userUrl}
          isLive={githubData.isLive}
        />
        <Education />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
