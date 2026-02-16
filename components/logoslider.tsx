"use client";
import React, { useState } from 'react';

const MapComponent = () => {
  // ISMO Clinic location
  const location = {
    address: "ISMO - Best Dermatologist Clinic in Chennai, No.24, G.S.Towers, First Floor, Abiramapuram 4th Street, Alwarpet, Chennai, Tamil Nadu 600018",
    shortAddress: "No.24, G.S.Towers, First Floor, Abiramapuram 4th Street, Alwarpet, Chennai",
    lat: 13.0309563,
    lng: 80.2575506,
  };

  // Google Maps URLs - Updated with correct embed format
  const googleMapsUrl = `https://maps.app.goo.gl/KUmiE3AqMWEWbD3Q6`;
  
  // Fixed embed URL - uses direct coordinates
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9687442079536!2d80.2575506!3d13.0309563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267cbd3da279b%3A0x2e606408c1271504!2sISMO%20-%20Best%20Dermatologist%20Clinic%20in%20Chennai!5e0!3m2!1sen!2sin!4v1770703130012`;
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="w-full py-8 sm:py-10 md:py-10 lg:py-10 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#fff7f1] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#65302f] mb-2 sm:mb-3">
            Visit Our Clinic
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#785546] max-w-2xl mx-auto px-2">
            Experience world-class hair treatment at our state-of-the-art facility in Alwarpet, Chennai
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Map Container with Google Maps Embed */}
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border border-[#e0c9c2]">
            {/* Loading state */}
            {!isMapLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="text-center p-4">
                  <div className="mb-3 sm:mb-4">
                    <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#65302f] animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-[#65302f] font-medium text-sm sm:text-base">Loading ISMO Clinic Location...</p>
                </div>
              </div>
            )}

            {/* Google Maps Iframe - Fixed with direct coordinates */}
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="ISMO Clinic Location"
              onLoad={() => setIsMapLoaded(true)}
            />

            {/* Interactive Overlay */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 group cursor-pointer z-20 flex items-center gap-2"
              aria-label="Open location in Google Maps"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#65302f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="text-xs sm:text-sm font-medium text-[#65302f] hidden sm:inline">Open in Maps</span>
            </a>

            {/* Location Info Box */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg max-w-[80%] sm:max-w-xs z-20">
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-3 h-3 bg-[#65302f] rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#65302f] mb-1">ISMO Clinic</h3>
                  <p className="text-xs text-[#785546] leading-tight">
                    Alwarpet, Chennai
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-[#e0c9c2]">
              {/* Phone */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-[#fff7f1] p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#65302f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#65302f] mb-1 sm:mb-2">Phone</h3>
                  <a 
                    href="tel:+918056133033" 
                    className="block text-base sm:text-lg md:text-xl font-medium text-[#785546] hover:text-[#65302f] transition-colors break-words"
                  >
                    +91 80561 33033
                  </a>
                  <p className="text-xs sm:text-sm text-[#785546]/80 mt-1">Call us for appointments and queries</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-[#fff7f1] p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#65302f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#65302f] mb-1 sm:mb-2">Email</h3>
                  <a 
                    href="mailto:info@ismoclinics.com" 
                    className="block text-base sm:text-lg text-[#785546] hover:text-[#65302f] transition-colors break-words"
                  >
                    info@ismoclinics.com
                  </a>
                  <p className="text-xs sm:text-sm text-[#785546]/80 mt-1">Send us your inquiries</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-[#fff7f1] p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#65302f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#65302f] mb-1 sm:mb-2">Address</h3>
                  <p className="text-sm sm:text-base text-[#785546] leading-relaxed">
                    No.24, G.S.Towers, First Floor,<br />
                    Abiramapuram 4th Street,<br />
                    Alwarpet,<br />
                    Chennai, Tamil Nadu 600018
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div className="text-center pt-2 sm:pt-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-[#65302f] to-[#785546] hover:from-[#503225] hover:to-[#65302f] text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-full text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions on Google Maps
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;