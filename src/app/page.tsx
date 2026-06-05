import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealSection from "@/components/RevealSection";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Projects from "@/sections/Projects";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import Contact from "@/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <RevealSection><About /></RevealSection>
        <RevealSection><Skills /></RevealSection>
        <RevealSection><Projects /></RevealSection>
        <RevealSection><Experience /></RevealSection>
        <RevealSection><Education /></RevealSection>
        <RevealSection><Contact /></RevealSection>
      </main>
      <Footer />
    </>
  );
}
