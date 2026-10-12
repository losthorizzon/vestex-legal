import { ChartShowcase } from "@/components/home/chart-showcase";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { ClosingCta, Faq, Gallery, HowItWorks, Stats } from "@/components/home/sections";
import { Reveal } from "@/components/motion/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <ChartShowcase />
      <HowItWorks />
      <Gallery />
      <section className="wrap py-24">
        <Reveal>
          <p className="eyebrow mb-4">Questions</p>
          <h2 className="display mb-10 text-[clamp(32px,4.6vw,52px)] font-bold leading-[1.05]">Good to know</h2>
        </Reveal>
        <Faq />
      </section>
      <ClosingCta />
    </>
  );
}
