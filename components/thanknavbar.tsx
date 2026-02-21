"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Script from "next/script";

interface NavbarProps {
  onConsultationClick?: () => void;
}

export default function ThankNavbar({ onConsultationClick }: NavbarProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Only run in browser environment
    if (typeof window !== "undefined") {
      checkMobile();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", checkMobile);
    }
    
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  // Trigger conversion event when component mounts (page loads)
  useEffect(() => {
    // Only run in browser and when mounted
    if (isMounted && typeof window !== "undefined" && window.gtag) {
      // Small delay to ensure gtag is loaded
      setTimeout(() => {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-16734973356/CFIVCPLctPwbEKzb7as-',
          'value': 1.0,
          'currency': 'INR'
        });
        console.log('Conversion event triggered: Submit lead form ISMO');
      }, 1000);
    }
  }, [isMounted]);

  // Don't render anything during SSR to avoid hydration mismatches
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-16 py-3 md:py-4 bg-[#634031] shadow-sm">
        {/* Static fallback for SSR */}
        <div className="flex items-center gap-4 md:gap-10">
          <div className="w-32 h-10 bg-[#fff7f1] rounded animate-pulse"></div>
        </div>
        <div className="bg-[#785546] text-white px-4 py-2 rounded-full text-sm flex items-center gap-2">
          <div className="w-4 h-4 bg-white/50 rounded"></div>
          <span>Call +91 80561 33033</span>
        </div>
      </nav>
    );
  }

  return (
    <>
      {/* Google Ads Conversion Script */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          // Initialize gtag if not already defined
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Fire conversion event
          gtag('event', 'conversion', {
            'send_to': 'AW-16734973356/CFIVCPLctPwbEKzb7as-',
            'value': 1.0,
            'currency': 'INR'
          });
        `}
      </Script>

      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-16 py-3 md:py-4 transition-all duration-500 ${
          navScrolled
            ? "bg-[#634031] shadow-lg"
            : "bg-[#634031] shadow-sm"
        }`}
      >
        {/* Left Logo */}
        <div className="flex items-center gap-4 md:gap-10">
          <Image
            src="/Logo-Final-White-01.png"
            alt="ISMO Clinic Logo"
            width={isMobile ? 120 : 160}
            height={isMobile ? 40 : 50}
            className="object-contain"
            priority
          />
        </div>

        {/* Call Button */}
        <a
          href="tel:+918056133033"
          className="bg-white hover:bg-[#fff7f1] text-[#634031] px-4 py-2 md:px-5 md:py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap flex items-center gap-2 border border-white hover:border-[#fff7f1] shadow-sm hover:shadow"
        >
          <svg 
            className="w-4 h-4 md:w-5 md:h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
            />
          </svg>
          {isMobile ? "Call Now" : "Call +91 80561 33033"}
        </a>
      </motion.nav>
    </>
  );
}