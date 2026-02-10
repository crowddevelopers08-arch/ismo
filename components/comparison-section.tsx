import React, { useState } from "react";
import ConsultationForm from "./popupform";
import { motion, AnimatePresence } from "framer-motion";

const HairCareSection = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
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
        damping: 20,
        delay: 0.2
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

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const microCTAVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.3
      }
    }
  };

  const treatmentCards = [
    // {
    //   title: "PRP Hair Treatment",
    //   image: "PRP-Hair-Injections-Before-and-After.jpg",
    //   desc: "Controls hair fall by strengthening weak hair roots using your own platelet-rich plasma. Improves thickness and supports natural regrowth.",
    // },
    {
      title: "GFC Hair Treatment",
      image: "/gfc.jpg",
      desc: "Growth Factor Concentrate derived from your own blood to strengthen roots, reduce hair fall, and improve overall hair density.",
    },
    {
      title: "Laser Hair Therapies & Scalp Revitalization",
      image: "/laser.jpg",
      desc: "Non-invasive light-based therapies that improve blood circulation, nourish follicles, and support long-term hair health.",
    },
  ];

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
        className="w-full bg-white py-8 max-[470px]:py-6 md:py-12 overflow-hidden"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* LEFT BIG CARD */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="lg:col-span-2 bg-[#785546] flex flex-col md:flex-row items-center p-6 md:p-8 lg:p-10 relative overflow-hidden rounded-lg md:rounded-xl group"
          >
            {/* Background gradient effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="absolute inset-0 bg-gradient-to-r from-[#65302f]/20 via-transparent to-[#65302f]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Image container */}
            <motion.div
              variants={imageVariants}
              className="md:absolute md:left-6 lg:left-8 md:top-1/2 md:-translate-y-1/2 w-full md:w-[30%] lg:w-[18rem] h-52 md:h-64 lg:h-80 mb-4 md:mb-0 overflow-hidden rounded-lg"
            >
              <motion.img
                whileHover="hover"
                src="/advanceddd.jpg"
                alt="Advanced Hair Treatment"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            <div className="md:ml-auto md:pl-[35%] lg:pl-[20rem] text-white text-center md:text-left">
              <motion.h2
                variants={textVariants}
                className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug"
              >
                Advanced Hair Treatments <br className="hidden md:block" /> at ISMO Clinic
              </motion.h2>

              <motion.p
                variants={textVariants}
                transition={{ delay: 0.1 }}
                className="text-xs sm:text-sm text-[#fff7f1] mt-3 md:mt-4 leading-relaxed"
              >
                At ISMO, hair treatments are not one-size-fits-all. Our dermatology
                team recommends a customized combination of therapies based on
                scalp analysis, hair root health, and lifestyle.
              </motion.p>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleOpenForm}
                className="mt-4 md:mt-6 bg-[#65302f] text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded relative overflow-hidden"
              >
                <motion.span
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <span className="relative">BOOK CONSULTATION</span>
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT TOP CARD */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="bg-[#fff7f1] flex flex-col items-center justify-center text-center p-6 md:p-8 lg:p-10 rounded-lg md:rounded-xl group"
          >
            {/* Image container */}
            <motion.div
              variants={imageVariants}
              className="w-full mb-4 md:mb-6 flex items-center justify-center"
            >
              <motion.img
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                src="/qr.jpg"
                alt="QR 678 Hair Treatment"
                className="h-32 sm:h-40 md:h-48 w-auto object-contain"
              />
            </motion.div>

            <motion.h3
              variants={textVariants}
              className="text-lg sm:text-xl font-medium text-[#65302f]"
            >
              QR 678 Hair Treatment
            </motion.h3>

            <motion.p
              variants={textVariants}
              transition={{ delay: 0.1 }}
              className="text-xs sm:text-sm text-[#785546] mt-2 md:mt-3 leading-relaxed"
            >
              Revolutionary peptide-based formulation that controls hair fall and
              stimulates new hair growth at the root level. Ideal for male and
              female pattern hair loss.
            </motion.p>

            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleOpenForm}
              className="mt-4 md:mt-5 bg-[#65302f] text-white px-4 sm:px-6 py-2 text-xs sm:text-sm hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded relative overflow-hidden"
            >
              <motion.span
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />
              <span className="relative">LEARN MORE</span>
            </motion.button>
          </motion.div>

          {/* BOTTOM CARDS - Responsive grid */}
          <motion.div
            variants={containerVariants}
            className="lg:col-start-1 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6"
          >
            {treatmentCards.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                whileHover="hover"
                className="bg-[#fff7f1] flex flex-col items-center justify-center text-center p-6 md:p-8 lg:p-10 h-full rounded-lg md:rounded-xl group"
              >
                {/* Image container - responsive height */}
                <motion.div
                  variants={imageVariants}
                  custom={index}
                  className="w-full mb-4 md:mb-6 flex items-center justify-center"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    src={item.image}
                    alt={item.title}
                    className="h-32 sm:h-40 md:h-48 w-auto max-w-full object-contain"
                  />
                </motion.div>

                <motion.h3
                  variants={textVariants}
                  custom={index}
                  className="text-lg sm:text-xl font-medium text-[#65302f]"
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  variants={textVariants}
                  custom={index}
                  transition={{ delay: 0.1 }}
                  className="text-xs sm:text-sm text-[#785546] mt-2 md:mt-3 leading-relaxed flex-grow"
                >
                  {item.desc}
                </motion.p>

                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleOpenForm}
                  className="mt-4 md:mt-5 bg-[#65302f] text-white px-4 sm:px-6 py-2 text-xs sm:text-sm hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded relative overflow-hidden"
                >
                  <motion.span
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                  <span className="relative">LEARN MORE</span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* MICRO CTA */}
        <motion.div
          variants={microCTAVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-6 md:mt-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xs sm:text-sm text-[#785546] max-w-3xl mx-auto px-4 mb-4"
          >
            Not sure which treatment suits you? Our doctors will recommend the right
            plan after a detailed hair consultation.
          </motion.p>
          {/* <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleOpenForm}
            className="bg-[#65302f] text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-[#e0c9c2] hover:text-[#65302f] transition duration-300 rounded relative overflow-hidden"
          >
            <motion.span
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
            <span className="relative">GET FREE CONSULTATION</span>
          </motion.button> */}
        </motion.div>
      </motion.section>
    </>
  );
};

export default HairCareSection;