"use client";
import DentalScalingOffer from "@/components/hair-loss-stages";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import FAQ from "@/components/faq";
import StudentSuccess from "@/components/comparison-section";

import DentalCareSection from "@/components/logoslider";
import WhyChooseSection from "@/components/video";
import TestimonialsSection from "@/components/offer-highlight";
import DoctorSection from "@/components/results-section";
import RealPatientResultsSection from "@/components/certification";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <section id="hero">
          <HeroSection />
        </section>
        
        <section id="why">
          <WhyChooseSection />
        </section>
{/* <RealPatientResultsSection /> */}
        <section id="services">
          <StudentSuccess />
        </section>
        <DoctorSection />


        <DentalScalingOffer />



        <section id="testimonials">
          <TestimonialsSection />
        </section>
                <DentalCareSection />
        <section id="faq">
          <FAQ />
        </section>

        <Footer />
      </main>
    </>
  );
}
