"use client";

import ThankNavbar from "@/components/thanknavbar";

export default function AboutUs() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
      <ThankNavbar />
      <div className="min-h-screen bg-[#101828] text-white"
            style={{fontFamily: "'Outfit', sans-serif"}}>

        {/* Hero Section */}
        <section className="relative pt-30 max-[470px]:pt-24 px-4 sm:px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Bangalore's Most Trusted Dental Clinic for Advanced Care
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Modern dental care designed for comfort, confidence, and long-lasting results, 
              right here in Bangalore.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 sm:py-12 md:py-16 bg-white/5">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              <div className="text-center flex-1 min-w-[120px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5b187]">4.98</div>
                <div className="text-sm sm:text-base text-gray-300 mt-2">Google Rating</div>
              </div>
              <div className="text-center flex-1 min-w-[120px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5b187]">7,000+</div>
                <div className="text-sm sm:text-base text-gray-300 mt-2">Happy Smiles</div>
              </div>
              <div className="text-center flex-1 min-w-[120px]">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e5b187]">₹999</div>
                <div className="text-sm sm:text-base text-gray-300 mt-2">Family Dental Consultation</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
              Upgrade Your Smile with Our Proven Dental Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Root Canal & Gum Treatment",
                  description: "Eliminate pain, treat infection, and save your natural tooth so your smile stays strong and healthy."
                },
                {
                  title: "Teeth Filling & Restoration",
                  description: "Repair cavities, chips, or worn teeth with precise restorations that strengthen and protect your smile."
                },
                {
                  title: "Scaling & Whitening",
                  description: "Remove plaque, tartar, and stains to reveal teeth that look brighter, feel cleaner, and keep your breath fresher."
                },
                {
                  title: "Tooth Extraction",
                  description: "Remove damaged or problematic teeth safely to relieve discomfort and prevent future dental complications."
                },
                {
                  title: "Dental Implants",
                  description: "Replace missing teeth with durable, natural-looking implants that let you eat, speak, and smile without hesitation."
                },
                {
                  title: "Clear Aligners",
                  description: "Straighten your teeth discreetly with comfortable, nearly invisible aligners that fit seamlessly into your lifestyle."
                }
              ].map((service, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 sm:p-6 backdrop-blur-sm border border-[#e68272]/20 hover:border-[#e68272]/40 transition-all duration-300">
                  <h3 className="text-lg sm:text-xl md:text-xl font-semibold mb-2 sm:mb-3 text-[#e5b187]">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Doctor Profile */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Dr. Apoorva Gopi</h2>
              <p className="text-lg sm:text-xl md:text-xl text-[#e5b187]">MDS – Orthodontics And Cosmetic Dentistry</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6 sm:p-8 backdrop-blur-sm border border-[#e68272]/20">
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-4 sm:mb-6">
                For over 5+ years, Dr. Apoorva Gopi has been helping patients restore healthy, confident smiles. 
                She specializes in dental implants, smile makeovers, veneers, crowns, bridges and full-mouth rehabilitation. 
                These are treatments that demand both precision and artistry.
              </p>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
                Patients often describe her as approachable and gentle, yet highly meticulous. She explains every step clearly, 
                easing anxiety and making even complex treatment feel simple. At the heart of her work is a belief: a smile 
                should never feel artificial. It should feel like you.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
                {[
                  "Holistic Care",
                  "Stress Free Treatments",
                  "Advanced Technology",
                  "USA Certified Specialist",
                  "Patient-Centered Approach",
                  "Affordable Pricing"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-300 text-sm sm:text-base">
                    <span className="text-[#e5b187] mr-2 text-lg">✔</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-white">
              Smile Goals? Reach Them in 5 Easy Steps
            </h2>
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {[
                {
                  step: "1",
                  title: "Your Warm Welcome",
                  description: "Walk in, feel at ease, and share your smile goals."
                },
                {
                  step: "2",
                  title: "Your Personalized Diagnosis",
                  description: "Get a clear assessment and a plan made just for you."
                },
                {
                  step: "3",
                  title: "Your Treatment Time",
                  description: "Experience gentle, modern care that puts you first."
                },
                {
                  step: "4",
                  title: "Your Aftercare Made Simple",
                  description: "Leave with easy tips to keep your smile healthy."
                },
                {
                  step: "5",
                  title: "Your Confident Exit",
                  description: "Step out ready to eat, laugh, and smile freely."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white/10 rounded-lg p-4 sm:p-6 backdrop-blur-sm border border-[#e68272]/20 hover:border-[#e68272]/40 transition-all duration-300">
                  <div className="bg-[#e68272] text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#e5b187] mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-r from-[#e68272] to-[#e5b187]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white leading-tight">
              Keep Your Family's Smiles Healthy & Happy — ₹999 Dental Consultation Offer!
            </h2>
            <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              From toothaches and cavities to misaligned teeth and sensitivity, we treat all common 
              dental issues to keep your smile healthy and pain-free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="flex items-center text-white text-sm sm:text-base">
                <span className="text-white mr-2 text-lg">✓</span>
                Fast Appointments
              </div>
              <div className="flex items-center text-white text-sm sm:text-base">
                <span className="text-white mr-2 text-lg">✓</span>
                Clear Consultation
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#101828] py-6 sm:py-8 px-4 sm:px-6 border-t border-[#e68272]/20">
          <div className="container mx-auto text-center">
            <p className="text-white text-sm sm:text-base">
              Copyright © 2025 Alora Dental Wellness | Powered by Alora Dental Wellness
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}