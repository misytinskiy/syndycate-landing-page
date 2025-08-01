import AdvantagesSection from "@/components/AdvantagesSection";
import FaqSection from "@/components/FaqSection";
import FooterSection from "@/components/FooterSection";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ParticipationSection from "@/components/ParticipationSection";
import ProgramSection from "@/components/ProgramSection";
import ResultsSection from "@/components/ResultsSection";
import StatsSection from "@/components/StatsSection";
import WhoIsForSection from "@/components/WhoIsForSection";

export default function Home() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: -124,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "linear-gradient(180deg, #0EDAFE 0%, #0A0A0A 100%)",
          filter: "blur(90px)",
          opacity: 0.6,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Header />
      <HeroSection />
      <StatsSection />
      <ProgramSection />
      <WhoIsForSection />
      <ResultsSection />
      <AdvantagesSection />
      <ParticipationSection />
      <FaqSection />
      <FooterSection />
    </>
  );
}
