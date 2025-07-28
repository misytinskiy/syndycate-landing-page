import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProgramSection from "@/components/ProgramSection";
import StatsSection from "@/components/StatsSection";

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
    </>
  );
}
