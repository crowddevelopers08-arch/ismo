"use client";
import React, { useState } from "react";
import ConsultationForm from "./popupform";
import { motion } from "framer-motion";

const HealthStats = () => {
  const colors = {
    primary: "#65302f",      // Main brown color
    primaryDark: "#65302f",  // Darker brown - UPDATED
    primaryLight: "#e0c9c2", // Light brown/pink
    bgLight: "#fff7f1",      // Very light cream background
    text: "#000000",         // Black text
    textLight: "#6b7280",    // Gray text
    white: "#ffffff",        // White
  };

  const [showForm, setShowForm] = useState(false); // State for showing form

  // Handle form open/close
  const handleOpenForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  const stats = [
    {
      percentage: "Step 1",
      description: "Consultation – Doctor understands your hair concern",
      isFilled: false,
    },
    {
      percentage: "Step 2",
      description: "Scalp Check – Quick scalp & root assessment",
      isFilled: true,
    },
    {
      percentage: "Step 3",
      description: "Personal Plan – Right treatment plan suggested",
      isFilled: false,
    },
    {
      percentage: "Step 4",
      description: "Session Starts – Non-surgical in-clinic session",
      isFilled: true,
    },
    {
      percentage: "Step 5",
      description: "Follow-Up – Home care + review for progress",
      isFilled: false,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      {/* Form Modal Overlay */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-2xl"
          >
            <ConsultationForm onClose={handleCloseForm} />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full py-6 sm:py-8 md:py-10 px-3 sm:px-4"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8 md:mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3"
              style={{ color: colors.text }}
            >
              Your Visit Process{" "}
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-[#785546] to-[#65302f] bg-clip-text text-transparent"
              >
                At ISMO
              </motion.span>
            </motion.h1>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="w-32 sm:w-40 md:w-48">
                <svg width="100%" height="16" viewBox="0 0 100 16">
                  <path
                    d="M0,8 C10,8 15,8 25,8 S40,8 50,8 S65,8 75,8 S90,8 100,8"
                    stroke={colors.primaryDark}
                    strokeWidth="2"
                    fill="none"
                    style={{
                      animation: `svgWave 2s ease-in-out infinite`,
                    }}
                  />
                </svg>
              </div>
              <style jsx>{`
                @keyframes svgWave {
                  0%,
                  100% {
                    d: path(
                      "M0,8 C10,8 15,8 25,8 S40,8 50,8 S65,8 75,8 S90,8 100,8"
                    );
                  }
                  25% {
                    d: path(
                      "M0,8 C10,4 15,12 25,8 S40,4 50,8 S65,12 75,8 S90,4 100,8"
                    );
                  }
                  50% {
                    d: path(
                      "M0,8 C10,12 15,4 25,8 S40,12 50,8 S65,4 75,8 S90,12 100,8"
                    );
                  }
                  75% {
                    d: path(
                      "M0,8 C10,4 15,12 25,8 S40,4 50,8 S65,12 75,8 S90,4 100,8"
                    );
                  }
                }
              `}</style>
            </motion.div> */}
          </motion.div>

          {/* Mobile Layout - All circles same size */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="sm:hidden"
          >
            <div className="w-full">
              {/* Top row - Steps 1 & 2 */}
              <div className="flex justify-between gap-2 mb-3">
                {stats.slice(0, 2).map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={circleVariants}
                    whileHover="hover"
                    className="flex-1 aspect-square rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 min-w-0"
                    style={{
                      backgroundColor: stat.isFilled ? colors.primary : colors.bgLight,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    <div className="text-center px-1">
                      <motion.h2
                        variants={textVariants}
                        className="text-sm font-bold mb-1"  // Changed from text-sm to text-base for mobile
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.percentage}
                      </motion.h2>
                      <motion.p
                        variants={textVariants}
                        className="text-[10px] leading-tight font-medium"  // Added font-medium
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Middle row - Steps 3 & 4 */}
              <div className="flex justify-between gap-2 mb-3">
                {stats.slice(2, 4).map((stat, index) => (
                  <motion.div
                    key={index + 2}
                    variants={circleVariants}
                    whileHover="hover"
                    className="flex-1 aspect-square rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300 min-w-0"
                    style={{
                      backgroundColor: stat.isFilled ? colors.primary : colors.bgLight,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    <div className="text-center px-1">
                      <motion.h2
                        variants={textVariants}
                        className="text-sm font-bold mb-1"  // Changed from text-sm to text-base for mobile
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.percentage}
                      </motion.h2>
                      <motion.p
                        variants={textVariants}
                        className="text-[10px] leading-tight font-medium"  // Added font-medium
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom row - Step 5 (same size as others) */}
              <div className="flex justify-center">
                <motion.div
                  variants={circleVariants}
                  whileHover="hover"
                  className="flex-1 max-w-[calc(50%-0.25rem)] aspect-square rounded-full flex flex-col items-center justify-center p-2 transition-all duration-300"
                  style={{
                    backgroundColor: stats[4].isFilled ? colors.primary : colors.bgLight,
                    border: `2px solid ${colors.primary}`,
                  }}
                >
                  <div className="text-center px-1">
                    <motion.h2
                      variants={textVariants}
                      className="text-sm font-bold mb-1"  // Changed from text-sm to text-base for mobile
                      style={{ 
                        color: stats[4].isFilled ? colors.white : colors.text 
                      }}
                    >
                      {stats[4].percentage}
                    </motion.h2>
                    <motion.p
                      variants={textVariants}
                      className="text-[10px] leading-tight font-medium"  // Added font-medium
                      style={{ 
                        color: stats[4].isFilled ? colors.white : colors.text 
                      }}
                    >
                      {stats[4].description}
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Tablet Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden sm:block lg:hidden"
          >
            <div className="w-full">
              {/* Top row - Steps 1, 2, 3 */}
              <div className="flex justify-between gap-3 md:gap-4 mb-4 md:mb-5">
                {stats.slice(0, 3).map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={circleVariants}
                    whileHover="hover"
                    className="flex-1 aspect-square rounded-full flex flex-col items-center justify-center p-3 transition-all duration-300 min-w-0"
                    style={{
                      backgroundColor: stat.isFilled ? colors.primary : colors.bgLight,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    <div className="text-center px-2">
                      <motion.h2
                        variants={textVariants}
                        className="text-base md:text-lg font-bold mb-2"
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.percentage}
                      </motion.h2>
                      <motion.p
                        variants={textVariants}
                        className="text-xs md:text-sm leading-tight"
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom row - Steps 4 & 5 */}
              <div className="flex justify-center gap-4 md:gap-6">
                {stats.slice(3).map((stat, index) => (
                  <motion.div
                    key={index + 3}
                    variants={circleVariants}
                    whileHover="hover"
                    className="flex-1 max-w-[calc(50%-1rem)] md:max-w-[calc(50%-1.5rem)] aspect-square rounded-full flex flex-col items-center justify-center p-3 md:p-4 transition-all duration-300"
                    style={{
                      backgroundColor: stat.isFilled ? colors.primary : colors.bgLight,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    <div className="text-center px-2">
                      <motion.h2
                        variants={textVariants}
                        className="text-base md:text-lg font-bold mb-2"
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.percentage}
                      </motion.h2>
                      <motion.p
                        variants={textVariants}
                        className="text-xs md:text-sm leading-tight"
                        style={{ 
                          color: stat.isFilled ? colors.white : colors.text 
                        }}
                      >
                        {stat.description}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Desktop Layout - Overlapping circles */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <motion.div 
              className="flex items-center justify-center gap-0 lg:gap-4 group/section cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                  className="w-40 h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 rounded-full flex flex-col items-center justify-center relative transition-all duration-300"
                  style={{
                    backgroundColor: stat.isFilled ? colors.primary : colors.bgLight,
                    border: `2px solid ${colors.primary}`,
                    marginLeft: index > 0 ? '-2rem' : '0',
                    zIndex: 10 - index,
                  }}
                >
                  <div className="text-center px-4 relative z-10">
                    <motion.h2
                      variants={textVariants}
                      className="text-lg lg:text-xl xl:text-2xl font-bold mb-2"
                      style={{ 
                        color: stat.isFilled ? colors.white : colors.text 
                      }}
                    >
                      {stat.percentage}
                    </motion.h2>
                    <motion.p
                      variants={textVariants}
                      className="text-xs lg:text-sm leading-tight"
                      style={{ 
                        color: stat.isFilled ? colors.white : colors.text 
                      }}
                    >
                      {stat.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Button - Width fits content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-6 sm:mt-8 md:mt-10"
          >
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleOpenForm}
              className="bg-[#65302f] text-white px-5 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base font-medium hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded inline-block"
            >
              SCHEDULE YOUR VISIT
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default HealthStats;