import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConsultationForm from "./popupform";
import { motion, AnimatePresence } from "framer-motion";

const BeforeAfterSection = () => {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const combinedImages = [
    {
      id: 1,
      image: "/ismoonenew.png",
      title: "Male Pattern Hair Loss",
      description: "6 months after PRP + QR 678 treatment",
      beforeLabel: "Before Treatment",
      afterLabel: "After 6 Months"
    },
    {
      id: 2,
      image: "/ismotwo.png",
      title: "Female Hair Thinning",
      description: "4 months after GFC therapy",
      beforeLabel: "Before Treatment",
      afterLabel: "After 4 Months"
    },
    {
      id: 3,
      image: "/ismothree.png",
      title: "Traction Alopecia",
      description: "8 weeks after laser therapy",
      beforeLabel: "Before Treatment",
      afterLabel: "After 8 Weeks"
    },
    {
      id: 4,
      image: "/ismofour.png",
      title: "Hair Density Improvement",
      description: "5 months after combined treatment",
      beforeLabel: "Before Treatment",
      afterLabel: "After 5 Months"
    },
    {
      id: 5,
      image: "/ismofive.png",
      title: "Androgenetic Alopecia",
      description: "7 months after PRP + GFC combination",
      beforeLabel: "Before Treatment",
      afterLabel: "After 7 Months"
    },
    {
      id: 6,
      image: "/ismosix.png",
      title: "Postpartum Hair Loss",
      description: "3 months after nutritional therapy + laser",
      beforeLabel: "Before Treatment",
      afterLabel: "After 3 Months"
    }
  ];

  // Create infinite loop array for desktop
  const desktopSlidesPerView = 4;
  // Duplicate images for infinite loop effect
  const infiniteDesktopImages = [...combinedImages, ...combinedImages, ...combinedImages];
  const [desktopStartIndex, setDesktopStartIndex] = useState(combinedImages.length);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile carousel navigation (infinite loop)
  const nextMobileSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % combinedImages.length);
  };

  const prevMobileSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + combinedImages.length) % combinedImages.length);
  };

  // Desktop carousel navigation (infinite loop - one by one)
  const nextDesktopSlide = () => {
    setDesktopStartIndex((prev) => {
      const nextIndex = prev + 1;
      // Reset to middle set when reaching the end
      if (nextIndex >= combinedImages.length * 2) {
        return combinedImages.length;
      }
      return nextIndex;
    });
  };

  const prevDesktopSlide = () => {
    setDesktopStartIndex((prev) => {
      const prevIndex = prev - 1;
      // Reset to middle set when reaching the beginning
      if (prevIndex < combinedImages.length) {
        return combinedImages.length * 2 - desktopSlidesPerView;
      }
      return prevIndex;
    });
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoplay || isHovering) return;
    
    const interval = setInterval(() => {
      if (isMobile) {
        nextMobileSlide();
      } else {
        nextDesktopSlide();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isMobile, autoplay, isHovering]);

  // Handle form open/close
  const handleOpenForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'auto';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        duration: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(101, 48, 47, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const arrowVariants = {
    hover: {
      x: -3,
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 0.5
      }
    }
  };

  const carouselButtonVariants = {
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    tap: {
      scale: 0.9
    }
  };

  // Get current desktop slides (infinite loop)
  const getCurrentDesktopSlides = () => {
    return infiniteDesktopImages.slice(desktopStartIndex, desktopStartIndex + desktopSlidesPerView);
  };

  // Calculate actual indices for display
  const getActualIndices = () => {
    const indices = [];
    for (let i = 0; i < desktopSlidesPerView; i++) {
      const actualIndex = (desktopStartIndex + i) % combinedImages.length;
      indices.push(actualIndex);
    }
    return indices;
  };

  return (
    <>
      {/* Form Modal Overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseForm}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ConsultationForm onClose={handleCloseForm} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white py-10 max-[470px]:py-8 md:py-10 overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#65302f] mb-3 md:mb-4"
            >
              Real Patients. Real Hair Regrowth.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-[#785546] max-w-3xl mx-auto px-2"
            >
              See how ISMO's advanced hair treatments helped our clients reduce hair thinning and improve hair density.
            </motion.p>
          </motion.div>

          {/* Desktop Carousel - Infinite Loop, One by One Navigation */}
          <div className="hidden md:block relative mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Desktop Carousel Container */}
              <div className="overflow-hidden pb-[20px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={desktopStartIndex}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-4 gap-4 md:gap-6"
                  >
                    {getCurrentDesktopSlides().map((item, index) => {
                      const actualIndex = (desktopStartIndex + index) % combinedImages.length;
                      const actualItem = combinedImages[actualIndex];
                      
                      return (
                        <motion.div
                          key={`${item.id}-${desktopStartIndex}-${index}`}
                          variants={itemVariants}
                          custom={index}
                          className="bg-[#fff7f1] rounded-lg overflow-hidden shadow-lg group"
                          onMouseEnter={() => {
                            setActiveOverlay(actualItem.id);
                            setAutoplay(false);
                          }}
                          onMouseLeave={() => {
                            setActiveOverlay(null);
                            setAutoplay(true);
                          }}
                          whileHover={{ y: -8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {/* Combined Image Container with 4:5 Aspect Ratio */}
                          <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg">
                            <motion.img
                              variants={imageVariants}
                              initial="hidden"
                              animate="visible"
                              whileHover="hover"
                              src={actualItem.image}
                              alt={`Before/After - ${actualItem.title}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Hover Overlay Effect */}
                            <AnimatePresence>
                              {activeOverlay === actualItem.id && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"
                                >
                                  {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <motion.div
                                      animate={{ rotate: [0, 10, 0] }}
                                      transition={{ repeat: Infinity, duration: 2 }}
                                      className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-xl"
                                    >
                                      <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                      </svg>
                                    </motion.div>
                                  </div> */}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Carousel Navigation Buttons */}
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={prevDesktopSlide}
                className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#65302f] w-10 h-20 flex items-center justify-center rounded-l-md shadow-lg hover:shadow-xl transition-shadow z-10"
                aria-label="Previous image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronLeft className="w-6 h-6" />
                </motion.div>
              </motion.button>
              
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={nextDesktopSlide}
                className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#65302f] w-10 h-20 flex items-center justify-center rounded-r-md shadow-lg hover:shadow-xl transition-shadow z-10"
                aria-label="Next image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </motion.button>

              {/* Desktop Carousel Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {combinedImages.map((_, index) => {
                  const isActive = getActualIndices().includes(index);
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => {
                        // Navigate to show this image as the first card
                        setDesktopStartIndex(combinedImages.length + index);
                      }}
                      className={`h-2 rounded-full transition-all ${
                        isActive ? 'bg-[#65302f] w-6' : 'bg-[#65302f]/30 w-2'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      animate={{
                        width: isActive ? 24 : 8,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Mobile Carousel - 4:5 Aspect Ratio */}
          <div className="md:hidden relative mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-lg"
              onMouseEnter={() => {
                setIsHovering(true);
                setAutoplay(false);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setAutoplay(true);
              }}
            >
              {/* Carousel Container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {combinedImages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex-shrink-0"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={item.image}
                        alt={`Before/After - ${item.title}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                          <svg className="w-3 h-3 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                          </svg>
                        </div>
                      </motion.div> */}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Carousel Navigation Buttons */}
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={prevMobileSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#65302f] w-8 h-14 flex items-center justify-center rounded-l-md shadow-lg"
                aria-label="Previous image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronLeft className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <motion.button
                variants={carouselButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={nextMobileSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 text-[#65302f] w-8 h-14 flex items-center justify-center rounded-r-md shadow-lg"
                aria-label="Next image"
              >
                <motion.div variants={arrowVariants} whileHover="hover">
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Mobile Carousel Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {combinedImages.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full ${
                      currentSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    animate={{
                      width: currentSlide === index ? 16 : 8,
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Image Counter */}
          {/* <div className="text-center mb-4">
            <p className="text-sm text-[#785546]">
              {isMobile 
                ? `${currentSlide + 1}/${combinedImages.length} Cases` 
                : `Showing ${getActualIndices().map(i => i + 1).join('-')} of ${combinedImages.length} Cases`
              }
            </p>
          </div> */}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg text-[#785546] mb-4 md:mb-6 max-w-3xl mx-auto px-2"
            >
              Want similar results? Book your hair diagnosis session with ISMO experts today.
            </motion.p>
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleOpenForm}
              className="bg-[#65302f] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-medium hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded relative overflow-hidden"
            >
              <motion.span
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative">BOOK DIAGNOSIS SESSION</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default BeforeAfterSection;