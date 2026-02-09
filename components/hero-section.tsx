"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ConsultationForm from "./popupform";

export default function HeroSection() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const scrollingTexts = [
    "Advanced treatments for hair fall & thinning",
    "Personalised protocols by expert dermatologists",
    "Comfortable, non-surgical sessions with minimal downtime",
  ];

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Auto-rotate texts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % scrollingTexts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [scrollingTexts.length]);

  const openConsultationForm = () => {
    setShowConsultationForm(true);
    setShowMobileMenu(false); // Close mobile menu when opening form
  };

  const closeConsultationForm = () => {
    setShowConsultationForm(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Prevent background scroll when modal or mobile menu is open
  useEffect(() => {
    if (showConsultationForm || showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showConsultationForm, showMobileMenu]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-hidden">
      {/* Consultation Form Popup */}
      <AnimatePresence>
        {showConsultationForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeConsultationForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <ConsultationForm onClose={closeConsultationForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-sm bg-gradient-to-b from-[#fff7f1] to-[#e0c9c2] rounded-2xl p-6 shadow-2xl border border-[#e0c9c2]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Content */}
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Logo */}
                <motion.div 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mb-4"
                >
                  <Image
                    src="/Logo-Final-White-01.png"
                    alt="alora logo"
                    width={180}
                    height={60}
                    className="object-contain"
                  />
                </motion.div>

                {/* Heading */}
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold text-[#785546]"
                >
                  Book Your Appointment Now
                </motion.h2>

                {/* Subheading */}
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg font-medium text-[#785546]"
                >
                  Get a Consultation Today!
                </motion.p>

                {/* Phone Number */}
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  href="tel:+9180561 33033"
                  className="w-full bg-[#785546] hover:bg-[#634031] text-[#fff7f1] font-bold py-4 rounded-full transition-colors shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  Call Us +91 80561 33033
                </motion.a>

                {/* Book Free Consultation Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={openConsultationForm}
                  className="w-full bg-[#785546] hover:bg-[#634031] text-[#fff7f1] font-bold py-4 rounded-full transition-colors shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  Book Your Consultation
                </motion.button>

                {/* Close Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setShowMobileMenu(false)}
                  className="mt-4 text-sm text-[#785546] underline hover:text-[#fff7f1] transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Background Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/ismonewban.jpg"
          alt="Modern dental clinic background"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </motion.div>

      {/* ======= Fixed Navbar ======= */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-16 py-3 md:py-4 transition-all duration-500 ${
          navScrolled
            ? "bg-[#785546] backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Left Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="flex items-center gap-4 md:gap-10"
        >
          <Image
            src="/Logo-Final-White-01.png"
            alt="alora logo"
            width={isMobile ? 120 : 200}
            height={isMobile ? 45 : 40}
            className="object-contain"
          />
        </motion.div>

        {/* Center Buttons - Hidden on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex bg-[#fff7f1] rounded-full items-center gap-4 px-2 py-1 shadow-sm border border-[#e0c9c2]"
        >
          <button 
            className="relative text-[#785546] px-5 py-2 font-medium hover:bg-[#f0e7e1] transition-colors rounded-full whitespace-nowrap group"
            aria-label="Schedule Your Appointment"
            onClick={openConsultationForm}
          >
            Schedule Your Appointment!
            <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-[#785546] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </button>
          
          <div className="h-6 w-px bg-[#e0c9c2]" aria-hidden="true"></div>
          
          <a
            href="tel:+918079791010"
            className="relative text-[#785546] font-semibold text-sm px-2 py-1 rounded-full hover:bg-[#f0e7e1] transition-colors whitespace-nowrap group"
            aria-label="Call Us at +91 80561 33033"
          >
            Call Us +91 80561 33033
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#785546] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
          </a>
        </motion.div>

        {/* Right Section - Different for mobile and desktop */}
        <div className="flex items-center">
          {/* Desktop: Book Now Button */}
          {!isMobile && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-[#fff7f1] hover:bg-[#e0c9c2] text-[#785546] px-5 py-2 rounded-full font-medium transition text-base whitespace-nowrap"
              onClick={openConsultationForm}
            >
              Book Now
            </motion.button>
          )}
          
          {/* Mobile: Hamburger Menu */}
          {isMobile && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg text-[#fff7f1] hover:bg-[#fff7f1]/20 transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* ======= Hero Section ======= */}
      <section className="relative z-10 flex flex-col md:flex-row items-center justify-around w-full max-w-8xl px-4 sm:px-6 md:px-12 flex-1 py-16 md:py-20 gap-6 md:gap-10">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col justify-center md:w-1/2 max-[470px]:pt-[40px] text-center md:text-left"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-[55px] lg:text-[45px] font-bold text-[#fff7f1] leading-tight mb-4 md:mb-12 drop-shadow-lg"
          >
           Regrow Thicker, <br className="hidden sm:block" /> 
            Fuller Hair at <br className="hidden sm:block" /> 
            ISMO Clinic, Chennai
          </motion.h1>

          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 space-y-2"
          >
            <li className="relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative inline-block max-w-full text-left max-[470px]:text-center"
              >
                <p className="text-sm sm:text-base md:text-lg font-bold text-[#fff7f1] leading-snug px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 relative z-10 inline-block">
                  <span className="hidden sm:inline">▪</span> Dermatologist-led hair care trusted by actors and directors{" "}
                  <br className="hidden sm:block" />
                  across Chennai. Control hair fall, improve density,{" "}
                  <br className="hidden sm:block" />
                  and bring back confidence with a personalised plan.
                </p>
                {/* Gradient background highlight */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute inset-0 bg-gradient-to-r from-[#785546]/40 to-[#e0c9c2]/20 rounded-lg blur-[1px] z-0"
                ></motion.div>
              </motion.div>
            </li>
          </motion.ul>

          {/* Desktop Button - Hidden on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex justify-center md:justify-start"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#fff7f1] hover:bg-[#e0c9c2] text-[#785546] px-6 py-3 rounded-full font-semibold w-fit transition shadow-lg text-sm md:text-base hover:shadow-xl"
              onClick={openConsultationForm}
            >
              Book Your Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-56 pt-[60px] max-[470px]:pt-[55px] w-full md:w-auto mt-4 md:mt-0"
        >
          {/* Rating Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ y: -5 }}
            className="relative max-[470px]:mt-80 bg-gradient-to-br from-[#fff7f1] to-[#f5e9e0] backdrop-blur-sm rounded-2xl px-5 py-4 md:px-7 md:py-5 shadow-xl flex flex-col items-center gap-3 border border-[#e0c9c2]/50 max-w-xs sm:max-w-sm mx-auto overflow-hidden"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#634031] via-[#785546] to-[#e0c9c2]"></div>
            
            {/* Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -top-2 right-4 bg-gradient-to-r from-[#634031] to-[#785546] text-white px-3 py-1 rounded-full shadow-lg"
            >
              <span className="text-xs font-bold tracking-wide">HURRY</span>
            </motion.div>
            
            {/* Main Content */}
            <div className="text-center space-y-2">
              {/* Title with Icon */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 mb-1"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 bg-gradient-to-br from-[#634031] to-[#785546] rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>
                <p className="text-base md:text-lg text-[#634031] font-bold">
                  Limited Slots Daily
                </p>
              </motion.div>
              
              {/* Description */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xs md:text-sm text-[#785546]/90 leading-relaxed"
              >
                Secure your consultation before slots fill up
              </motion.p>
              
              {/* Contact Section */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-3 p-3 bg-white/50 rounded-lg border border-[#e0c9c2]/50"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-[#785546]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs md:text-sm text-[#785546] font-medium">
                    WhatsApp or Call to Confirm
                  </p>
                </div>
                
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:+9180561 33033" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#634031] to-[#785546] text-white text-sm md:text-base font-bold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 80561 33033
                </motion.a>
              </motion.div>
              
              {/* Bottom Note */}
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-[10px] md:text-xs text-[#785546]/70 italic mt-2"
              >
                Slots fill fast. Book now to avoid waiting.
              </motion.p>
            </div>
          </motion.div>

          {/* Text Scroll Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-[360px] mx-auto"
          >
            <div className="relative w-full bg-gradient-to-b from-[#785546]/30 to-[#fff7f1]/20 rounded-[20px] p-5 md:p-6 shadow-[0_8px_20px_rgba(120,85,70,0.1)] backdrop-blur-sm border border-[#e0c9c2]">
              {/* Scroll Icon */}
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-[#fff7f1] to-[#e0c9c2] flex items-center justify-center shadow-lg"
              >
                <svg className="w-3 h-3 text-[#785546]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>

              {/* Text Scroll Container */}
              <div className="h-14 md:h-16 overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    {/* Text Content */}
                    <div className="text-center space-y-1.5">
                      {/* Top accent line */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center justify-center gap-1.5"
                      >
                        <div className="w-3 h-0.5 bg-[#fff7f1] rounded-full"></div>
                        <div className="w-1 h-1 bg-[#fff7f1] rounded-full"></div>
                        <div className="w-3 h-0.5 bg-[#fff7f1] rounded-full"></div>
                      </motion.div>
                      
                      {/* Main text */}
                      <motion.div 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f1]/80 via-[#f5e9e0]/80 to-[#fff7f1]/80 backdrop-blur-[1px] rounded-lg border border-[#e0c9c2]/60"></div>
                          <div className="relative px-4 py-2">
                            <p className="text-sm md:text-base font-bold text-[#634031] leading-snug text-center">
                              {scrollingTexts[currentTextIndex]}
                            </p>
                            {/* Subtle decorative dots */}
                            <motion.div 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#785546]/40"
                            ></motion.div>
                            <motion.div 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#785546]/40"
                            ></motion.div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {/* Bottom accent line */}
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center gap-1.5"
                      >
                        <div className="w-2 h-0.5 bg-[#e0c9c2] rounded-full"></div>
                        <div className="w-1.5 h-0.5 bg-[#e0c9c2] rounded-full"></div>
                        <div className="w-2 h-0.5 bg-[#e0c9c2] rounded-full"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Animated progress indicator */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 overflow-hidden">
                  <motion.div
                    key={currentTextIndex}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2.8, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-[#fff7f1] via-[#e0c9c2] to-[#fff7f1]"
                  />
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-3">
                {scrollingTexts.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentTextIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTextIndex 
                        ? "bg-[#fff7f1] scale-110" 
                        : "bg-[#e0c9c2] hover:bg-[#fff7f1]/70"
                    }`}
                    aria-label={`Go to point ${index + 1}`}
                  />
                ))}
              </div>

              {/* Additional Decorative Elements */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-2 left-2 w-1.5 h-1.5 bg-[#fff7f1] rounded-full opacity-50"
              ></motion.div>
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-[#fff7f1] rounded-full opacity-50"
              ></motion.div>
            </div>

            {/* Mobile Button - Only shown on mobile below text scroll */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="md:hidden flex justify-center mt-6"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#fff7f1] hover:bg-[#e0c9c2] text-[#785546] px-6 py-3 rounded-full font-semibold w-fit transition shadow-lg text-sm hover:shadow-xl"
                onClick={openConsultationForm}
              >
                Book Your Consultation
              </motion.button>
            </motion.div>

            {/* Navigation Arrows - Hidden on mobile */}
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentTextIndex((prev) => (prev - 1 + scrollingTexts.length) % scrollingTexts.length)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-[#fff7f1]/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-[#fff7f1] transition-colors border border-[#e0c9c2]"
              aria-label="Previous point"
            >
              <svg className="w-4 h-4 text-[#785546]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentTextIndex((prev) => (prev + 1) % scrollingTexts.length)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-[#fff7f1]/95 backdrop-blur-sm rounded-full shadow-lg items-center justify-center hover:bg-[#fff7f1] transition-colors border border-[#e0c9c2]"
              aria-label="Next point"
            >
              <svg className="w-4 h-4 text-[#785546]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}