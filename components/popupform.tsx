"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type SubmitStatus = "idle" | "success" | "error";

interface ConsultationFormProps {
  onClose?: () => void;
}

export default function ConsultationForm({ onClose }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "",
    concern: "",
    preferredDateTime: "",
    source: "https://www.ismoskinclinicchennai.in/",
    formName: "Hair Consultation Form",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const closeButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(120, 85, 70, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.9,
    },
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare lead data for TeleCRM + Prisma API
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        treatment: formData.treatment,
        concern: formData.concern,
        preferredDateTime: formData.preferredDateTime,
        source: formData.source,
        formName: formData.formName,
        consent: true,
        procedure: formData.treatment,
        concerns: formData.concern,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");

        // Reset form
        setFormData({
          name: "",
          phone: "",
          treatment: "",
          concern: "",
          preferredDateTime: "",
          source: "https://www.ismoskinclinicchennai.in/",
          formName: "Hair Consultation Form",
        });

        // Redirect to thank you page after a brief delay
        setTimeout(() => {
          router.push("/thank-you");
        }, 1500);
      } else {
        setSubmitStatus("error");
        console.error("Submission failed:", result);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-[90vw] sm:max-w-[480px] md:max-w-[520px] mx-auto bg-[#fff7f1] rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg shadow-[rgba(120,85,70,0.15)] relative border border-[#e0c9c2]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Close Button */}
      <motion.button
        type="button"
        onClick={handleClose}
        className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center rounded-full bg-transparent hover:bg-[#e0c9c2] transition-colors duration-200 z-10"
        variants={closeButtonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Close form"
      >
        <svg
          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#65302f]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>

      {/* Title */}
      <motion.h2
        className="text-xl sm:text-2xl font-bold text-[#65302f] mb-1 sm:mb-2 text-center pr-6 sm:pr-8"
        variants={itemVariants}
      >
        Book Your Hair Consultation at ISMO, RA Puram
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-xs sm:text-sm text-[#785546] mb-3 sm:mb-4 text-center"
        variants={itemVariants}
      >
        Share a few details and our team will call you to confirm your slot and suggest the best time for your visit.
      </motion.p>

      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-2 sm:p-2.5 bg-green-100 border border-green-400 text-green-700 rounded-md text-center text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Thank you! Your consultation has been booked successfully.
          </div>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 p-2 sm:p-2.5 bg-red-100 border border-red-400 text-red-700 rounded-md text-center text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Sorry, there was an error submitting your form. Please try again.
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        {/* Row 1 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
          variants={containerVariants}
        >
          <motion.div className="flex flex-col" variants={itemVariants}>
            <label
              htmlFor="name"
              className="text-xs sm:text-sm font-semibold text-[#65302f] mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <motion.input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-1.5 sm:py-2 rounded-md border border-[#e0c9c2] bg-white text-[#65302f] placeholder:text-[#785546]/60 focus:outline-none focus:ring-2 focus:ring-[#65302f] transition-all duration-300 text-xs sm:text-sm"
              whileFocus={{
                scale: 1.02,
                borderColor: "#65302f",
                transition: { duration: 0.2 },
              }}
            />
          </motion.div>

          <motion.div className="flex flex-col" variants={itemVariants}>
            <label
              htmlFor="phone"
              className="text-xs sm:text-sm font-semibold text-[#65302f] mb-1"
            >
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <motion.input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-1.5 sm:py-2 rounded-md border border-[#e0c9c2] bg-white text-[#65302f] placeholder:text-[#785546]/60 focus:outline-none focus:ring-2 focus:ring-[#65302f] transition-all duration-300 text-xs sm:text-sm"
              whileFocus={{
                scale: 1.02,
                borderColor: "#65302f",
                transition: { duration: 0.2 },
              }}
            />
          </motion.div>
        </motion.div>

        {/* Row 2 - Treatment Interested In */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label
            htmlFor="treatment"
            className="text-xs sm:text-sm font-semibold text-[#65302f] mb-1"
          >
            Treatment Interested In
          </label>
          <motion.select
            id="treatment"
            name="treatment"
            value={formData.treatment}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 sm:py-2 rounded-md border border-[#65302f] bg-white text-[#65302f] focus:outline-none focus:ring-2 focus:ring-[#65302f] transition-all duration-300 text-xs sm:text-sm"
            whileFocus={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <option value="">Select treatment</option>
            <option value="QR 678">QR 678</option>
            <option value="GFC">GFC</option>
            <option value="PRP">PRP</option>
            <option value="Not sure – Need doctor guidance">Not sure – Need doctor guidance</option>
          </motion.select>
        </motion.div>

        {/* Row 3 - Concern */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label
            htmlFor="concern"
            className="text-xs sm:text-sm font-semibold text-[#65302f] mb-1"
          >
            Concern
          </label>
          <motion.select
            id="concern"
            name="concern"
            value={formData.concern}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 sm:py-2 rounded-md border border-[#65302f] bg-white text-[#65302f] focus:outline-none focus:ring-2 focus:ring-[#65302f] transition-all duration-300 text-xs sm:text-sm"
            whileFocus={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <option value="">Select your concern</option>
            <option value="Hair fall">Hair fall</option>
            <option value="Bald patches">Bald patches</option>
            <option value="Thinning">Thinning</option>
            <option value="Dandruff">Dandruff</option>
            <option value="Others">Others</option>
          </motion.select>
        </motion.div>

        {/* Row 4 - Preferred Date & Time */}
        <motion.div className="flex flex-col" variants={itemVariants}>
          <label
            htmlFor="preferredDateTime"
            className="text-xs sm:text-sm font-semibold text-[#65302f] mb-1"
          >
            Preferred Date & Time
          </label>
          <motion.input
            id="preferredDateTime"
            name="preferredDateTime"
            type="text"
            placeholder="e.g., Tomorrow 4 PM or This Saturday 11 AM"
            value={formData.preferredDateTime}
            onChange={handleInputChange}
            className="w-full px-3 py-1.5 sm:py-2 rounded-md border border-[#e0c9c2] bg-white text-[#65302f] placeholder:text-[#785546]/60 focus:outline-none focus:ring-2 focus:ring-[#65302f] transition-all duration-300 text-xs sm:text-sm"
            whileFocus={{
              scale: 1.02,
              borderColor: "#65302f",
              transition: { duration: 0.2 },
            }}
          />
        </motion.div>

        {/* Hidden fields for TeleCRM / backend */}
        <input
          type="hidden"
          name="source"
          value="https://www.ismoskinclinicchennai.in/"
        />
        <input type="hidden" name="formName" value="Hair Consultation Form" />

        {/* Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-1 px-4 sm:px-6 py-2 sm:py-2.5 bg-[#65302f] text-white font-semibold rounded-full hover:bg-[#785546] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 text-xs sm:text-sm shadow-md shadow-[rgba(120,85,70,0.2)]"
          variants={buttonVariants}
          whileHover={!isSubmitting ? "hover" : undefined}
          whileTap={!isSubmitting ? "tap" : undefined}
        >
          {isSubmitting ? "Submitting..." : "Book My Slot Now"}
        </motion.button>
      </form>

      {/* Additional Info */}
      <motion.p
        className="text-xs text-[#785546] text-center mt-3 sm:mt-4"
        variants={itemVariants}
        transition={{ delay: 0.5 }}
      >
        * Our team will contact you within 24 hours to confirm your appointment
      </motion.p>
    </motion.div>
  );
}