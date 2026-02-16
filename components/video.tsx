import React, { useState } from "react";
import ConsultationForm from "./popupform";
import { motion, AnimatePresence } from "framer-motion";

const BeforeAfterSection = () => {
  const [showForm, setShowForm] = useState(false);

  const imageData = {
    id: 1,
    image: "/singlebefaft.jpeg",
    title: "Male Pattern Hair Loss",
    description: "6 months after PRP + QR 678 treatment"
  };

  // Handle form open/close
  const handleOpenForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'auto';
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
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-8"
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

          {/* Single Image - Centered with fixed dimensions */}
          <div className="flex justify-center items-center mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-xl">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={imageData.image}
                  alt={imageData.title}
                  className="w-full object-cover"
                />
              </div>
            
            </motion.div>
          </div>

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