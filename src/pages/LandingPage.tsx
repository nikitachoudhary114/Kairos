import CTA from "@/components/LandingPage/CTA";
import Features from "@/components/LandingPage/Features";
import Hero from "@/components/LandingPage/Hero";
import Testimonals from "@/components/LandingPage/Testimonals";

const LandingPage = () => {
  return (
    <div className="min-h-screen">
    
      <main>
        <Hero/>
        <Features />
         <Testimonals/>
        <CTA />
      </main>

    </div>
  );
};

export default LandingPage;
