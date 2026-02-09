import React, { useState, useEffect } from 'react';

const ProcedureSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState('right');

  // Data for hair treatments
  const data = {
    1: {
      img: "/advancednew.jpg",
      alt: "Advanced Hair Assessment",
      content: (
        <>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#634031] mb-2 md:mb-3 font-outfit">Advanced Hair Assessment</h3>
          <p className="text-sm md:text-base text-[#785546] leading-relaxed font-outfit">Our dermatologists perform a detailed scalp analysis using trichoscopy to examine hair root health, density, and growth patterns.</p>
        </>
      ),
      shortTitle: "Advanced Assessment"
    },
    2: {
      img: "/personalizeda.png",
      alt: "Personalized Treatment Plan",
      content: (
        <>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#634031] mb-2 md:mb-3 font-outfit">Personalized Treatment Plan</h3>
          <p className="text-sm md:text-base text-[#785546] leading-relaxed font-outfit">Based on your assessment, we design a customized combination of therapies like QR 678, PRP, GFC, or laser treatments tailored to your needs.</p>
        </>
      ),
      shortTitle: "Personalized Plan"
    },
    3: {
      img: "/maintain.jpg",
      alt: "Treatment & Monitoring",
      content: (
        <>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#634031] mb-2 md:mb-3 font-outfit">Treatment & Monitoring</h3>
          <p className="text-sm md:text-base text-[#785546] leading-relaxed font-outfit">Your treatment begins with precision. We monitor progress monthly and adjust protocols to ensure optimal hair regrowth and thickness.</p>
        </>
      ),
      shortTitle: "Treatment & Monitoring"
    },
    4: {
      img: "/results.jpg",
      alt: "Results & Maintenance",
      content: (
        <>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#634031] mb-2 md:mb-3 font-outfit">Results & Maintenance</h3>
          <p className="text-sm md:text-base text-[#785546] leading-relaxed font-outfit">Visible improvement in hair density and reduced hair fall. We provide maintenance guidelines for long-term hair health.</p>
        </>
      ),
      shortTitle: "Results & Maintenance"
    },
    5: {
      img: "/hostle.jpg",
      alt: "Holistic Wellness Support",
      content: (
        <>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#634031] mb-2 md:mb-3 font-outfit">Holistic Wellness Support</h3>
          <p className="text-sm md:text-base text-[#785546] leading-relaxed font-outfit">Nutrition, stress management, and lifestyle guidance to address root causes of hair loss for sustainable results.</p>
        </>
      ),
      shortTitle: "Holistic Support"
    }
  };

  // Auto-rotate steps every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDirection('right');
      setActiveStep(prevStep => prevStep === 5 ? 1 : prevStep + 1);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleStepClick = (step: number) => {
    setDirection(step > activeStep ? 'right' : 'left');
    setActiveStep(step);
  };

  return (
    <section className="bg-white text-[#101828] w-full py-10 md:py-12 max-[470px]:py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-[#101828] mb-3 leading-tight font-outfit">
            Why Choose <span className="text-[#785546]">ISMO</span> for Your Hair?
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-[#785546] max-w-3xl mx-auto leading-relaxed font-outfit">
            ISMO Skin Clinic stands out in Chennai for its blend of technology, medical expertise, and patient-first care.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6 items-start mb-8">
          {/* Steps Sidebar - Full width on mobile, left column on desktop */}
          <div className="lg:col-span-1">
            <div className="border border-[#e0c9c2] rounded-xl overflow-hidden bg-white shadow-lg shadow-[rgba(120,85,70,0.1)] max-w-lg lg:max-w-full mx-auto lg:mx-0">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center px-3 py-3 md:px-4 md:py-3 cursor-pointer transition-all duration-300 border-b border-[#e0c9c2] last:border-b-0 font-outfit ${
                    activeStep === step 
                      ? 'bg-[#fff7f1] border-l-3 border-l-[#785546]' 
                      : 'bg-white hover:bg-[#fff7f1]'
                  }`}
                  onClick={() => handleStepClick(step)}
                >
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-semibold mr-3 md:mr-3 transition-all duration-300 flex-shrink-0 border font-outfit ${
                    activeStep === step 
                      ? 'bg-[#785546] text-white border-[#785546]' 
                      : 'bg-[#fff7f1] text-[#634031] border-[#e0c9c2]'
                  }`}>
                    {step}
                  </div>
                  <span className={`text-sm md:text-base font-semibold transition-colors duration-200 font-outfit ${
                    activeStep === step ? 'text-[#785546]' : 'text-[#634031]'
                  }`}>
                    {data[step].shortTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image and Content - Stacked on mobile, side by side on desktop */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 items-center">
            {/* Image */}
            <div className="flex justify-center items-center p-2 order-1 md:order-1">
              <div className="relative">
                <img 
                  src={data[activeStep].img} 
                  alt={data[activeStep].alt} 
                  className={`w-full max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[280px] aspect-square object-cover rounded-full border-4 md:border-5 border-white shadow-lg shadow-[rgba(120,85,70,0.15)] transition-all duration-700 ${
                    direction === 'right' ? 'animate-slideInRight' : 'animate-slideInLeft'
                  }`}
                  key={activeStep}
                />
              </div>
            </div>

            {/* Content - Vertically centered */}
            <div className="bg-[#fff7f1] p-4 md:p-5 rounded-xl shadow-lg shadow-[rgba(120,85,70,0.1)] border border-[#e0c9c2] order-2 md:order-2 self-center">
              <div className={`transition-all duration-500 ${
                direction === 'right' ? 'animate-fadeInRight' : 'animate-fadeInLeft'
              }`}>
                {data[activeStep].content}
              </div>
            </div>
          </div>
        </div>

        {/* Auto-rotation indicator */}
        <div className="flex justify-center gap-2 mt-4 md:mt-6 font-outfit">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-500 ${
                activeStep === step 
                  ? 'bg-[#785546] scale-125' 
                  : 'bg-[#e0c9c2] scale-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Add animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInRight {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
        
        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-fadeInRight {
          animation: fadeInRight 0.5s ease-out forwards;
        }
        
        .animate-fadeInLeft {
          animation: fadeInLeft 0.5s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-pulseScale {
          animation: pulseScale 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default ProcedureSection;