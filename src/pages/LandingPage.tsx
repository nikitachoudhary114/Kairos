import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonals from "@/components/Testimonals";

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
