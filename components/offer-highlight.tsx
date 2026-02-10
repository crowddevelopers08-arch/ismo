"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ConsultationForm from "./popupform";
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Updated reviews with celebrity data
const celebrityReviews = [
  {
    name: 'Aishwarya Dutta',
    title: 'Actress',
    image: '/ais.jpg',
    rating: 5,
    quote: 'ISMO completely transformed my hair. The personalized approach and expert care made all the difference. Highly recommended!',
  },
  {
    name: 'N. Lingusamy',
    title: 'Director',
    image: '/n-lingusamy.jpg',
    rating: 5,
    quote: 'Professional team with cutting-edge treatments. My hair has never looked better. ISMO is the best in Chennai.',
  },
  {
    name: 'Nikki Galrani',
    title: 'Actress',
    image: '/Nikki.jpg',
    rating: 5,
    quote: 'ISMO understands hair care on another level. The results speak for themselves. I trust them completely.',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % celebrityReviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleContactClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // Don't render dynamic content during SSR
  if (!isMounted) {
    return (
      <section className="w-full min-h-screen bg-gradient-to-br from-[#fff7f1] via-[#fff7f1] to-[#f8f0e9] flex items-center justify-center py-8 lg:py-0 overflow-hidden relative">
        <div className="container mx-auto max-[470px]:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10 xl:gap-16 w-full mx-auto">
            {/* Loading skeleton */}
            <div className="lg:relative lg:left-[70px] xl:left-[250px] z-10 order-2 lg:order-1">
              <div className="h-12 bg-[#e0c9c2] rounded mb-6 lg:mb-8 w-3/4"></div>
              <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
                <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm w-full xl:w-1/2 h-40"></div>
                <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm w-full xl:w-1/2 h-40"></div>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="bg-[#e0c9c2] rounded-xl w-full max-w-md lg:max-w-lg xl:max-w-xl h-64 lg:h-96"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full min-h-screen bg-gradient-to-br from-[#fff7f1] via-[#fff7f1] to-[#f8f0e9] flex items-center justify-center py-8 lg:py-0 overflow-hidden relative">
        {/* Background accents */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#785546]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#65302f]/5 to-transparent rounded-full blur-3xl"></div>

        <div className="container mx-auto max-[470px]:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-10 xl:gap-16 w-full mx-auto">
            
            {/* Left Content */}
            <div className="lg:relative lg:left-[70px] xl:left-[250px] z-10 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-[#65302f] text-center lg:text-left">
                Our Celebrity Reviews
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="transition-all duration-700 ease-in-out"
              >
                <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
                  {/* Current Review Card */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -12 }}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#e0c9c2] w-full xl:w-1/2"
                  >
                    {/* Image */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-[#785546]"
                      >
                        <Image
                          src={celebrityReviews[current].image}
                          alt={celebrityReviews[current].name}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center">
                      <div>
                        <h3 className="font-bold text-[#65302f]">{celebrityReviews[current].name}</h3>
                        <p className="text-sm text-[#785546]">{celebrityReviews[current].title}</p>
                      </div>

                      {/* Stars */}
                      <div className="flex justify-center gap-1">
                        {[...Array(celebrityReviews[current].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-[#e0c9c2] text-[#e0c9c2]" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-[#65302f]/80 italic text-sm lg:text-base leading-relaxed">
                        "{celebrityReviews[current].quote}"
                      </p>
                    </div>
                  </motion.div>

                  {/* Next Review Card */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -12 }}
                    className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-[#e0c9c2] w-full xl:w-1/2"
                  >
                    {/* Image */}
                    <div className="flex justify-center mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-[#785546]"
                      >
                        <Image
                          src={celebrityReviews[(current + 1) % celebrityReviews.length].image}
                          alt={celebrityReviews[(current + 1) % celebrityReviews.length].name}
                          fill
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-center">
                      <div>
                        <h3 className="font-bold text-[#65302f]">{celebrityReviews[(current + 1) % celebrityReviews.length].name}</h3>
                        <p className="text-sm text-[#785546]">{celebrityReviews[(current + 1) % celebrityReviews.length].title}</p>
                      </div>

                      {/* Stars */}
                      <div className="flex justify-center gap-1">
                        {[...Array(celebrityReviews[(current + 1) % celebrityReviews.length].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-5 h-5 fill-[#e0c9c2] text-[#e0c9c2]" />
                          </motion.div>
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="text-[#65302f]/80 italic text-sm lg:text-base leading-relaxed">
                        "{celebrityReviews[(current + 1) % celebrityReviews.length].quote}"
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bottom Ratings + Button */}
              <div className="mt-6 lg:mt-10 bg-white p-4 lg:p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm border border-[#e0c9c2]">
                <div className="flex items-center gap-3">
                  <p className="text-2xl lg:text-3xl font-bold text-[#65302f]">5.0</p>
                  <div>
                    <p className="text-sm text-[#785546]">Ratings</p>
                    <div className="flex gap-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-[#e0c9c2] text-lg lg:text-xl">★</span>
                        ))}
                    </div>
                    <p className="text-xs text-[#785546]/70">
                      Rated 5.0 stars by celebrities and patients
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleContactClick}
                  className="bg-gradient-to-r from-[#65302f] to-[#785546] hover:from-[#503225] hover:to-[#65302f] transition px-6 py-3 rounded-full font-medium text-[#fff7f1] text-sm lg:text-base w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#65302f]/10 via-[#785546]/10 to-[#65302f]/10 rounded-2xl blur-xl"></div>
                <Image
                  src="/revvie.jpg"
                  alt="Happy Client"
                  width={600}
                  height={500}
                  className="object-contain rounded-xl w-full max-w-md lg:max-w-lg xl:max-w-xl relative z-1 border-2 border-[#e0c9c2]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Overlay */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="relative">
              <ConsultationForm onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}