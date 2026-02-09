"use client";

import Image from "next/image";
import React, { useState } from "react";
import ConsultationForm from "./popupform";

export default function DentalHero() {
  const [showForm, setShowForm] = useState(false);

  const handleBookAppointment = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      <section
        className="relative flex items-center justify-center lg:justify-start h-screen min-h-[600px] lg:h-[80vh] bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('/try.jpg')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 lg:from-black/50 lg:via-black/30 lg:to-transparent"></div>

        {/* Enhanced Content Box */}
        <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-3xl shadow-2xl p-6 sm:p-8 mx-4 sm:mx-6 lg:mx-12 max-w-2xl w-full border border-white/30">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl max-[470px]:text-center md:text-4xl lg:text-5xl font-bold text-[#0b2b4c] leading-tight">
              Alora Dental Clinic{" "}
              <span className="text-[#de7566] block sm:inline mt-2 sm:mt-0">
                for you and your loved one.
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed border-l-4 border-[#80c141] pl-4">
            From toothaches and cavities to misaligned teeth and sensitivity, we treat all common dental issues to keep your smile healthy and pain-free.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-[#f7fdfb] to-[#e8f7e8] p-3 sm:p-4 rounded-xl border border-[#80c141]/20">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80c141] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <h3 className="font-semibold text-[#114520] text-sm sm:text-base">Fast Appointments</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">Zero stress scheduling around your convenience</p>
            </div>

            <div className="bg-gradient-to-br from-[#f7fdfb] to-[#e8f7e8] p-3 sm:p-4 rounded-xl border border-[#f05623]/20">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#80c141] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <h3 className="font-semibold text-[#114520] text-sm sm:text-base">Clear Consultation</h3>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">We listen and explain every treatment clearly</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <button 
              onClick={handleBookAppointment}
              className="bg-[#0b2b4c] hover:bg-[#0a2342] text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
            >
              Book Your Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Form Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <ConsultationForm onClose={handleCloseForm} />
        </div>
      )}
    </>
  );
}