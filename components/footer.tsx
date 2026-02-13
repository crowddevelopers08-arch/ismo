"use client";

import { motion } from 'framer-motion';
import { Instagram, Facebook, Youtube, Twitter, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import ConsultationForm from './popupform';

const Footer = () => {
  const [showForm, setShowForm] = useState(false); // State for showing form

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/ismoclinic.skin/', label: 'Instagram' },
    // { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: 'https://www.youtube.com/@ismoskinhairclinic2729', label: 'YouTube' },
    // { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const footerLinks = [
    {
      title: 'Treatments',
      links: [
        { label: 'QR 678 Therapy', href: '#treatments' },
        // { label: 'PRP Treatment', href: '#treatments' },
        { label: 'GFC Therapy', href: '#treatments' },
        { label: 'Laser Therapy', href: '#treatments' },
      ],
    },
    {
      title: 'Clinic',
      links: [
        { label: 'About ISMO', href: '#why-ismo' },
        { label: 'Our Team', href: '#' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'Contact', href: '#contact' },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { label: 'Book Consultation', href: '#contact' },
        { label: 'FAQs', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
  ];

  // Handle form open/close
  const handleOpenForm = () => {
    setShowForm(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const handleCloseForm = () => {
    setShowForm(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  return (
    <>
      {/* Form Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <ConsultationForm onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Mobile CTA Buttons (Fixed at bottom for mobile only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="flex w-full bg-white/95 backdrop-blur-sm border-t border-[#e0c9c2] shadow-lg">
          {/* Call Now Button */}
          <a 
            href="tel:+9180561 33033"
            className="flex-1 flex items-center justify-center py-4 px-2 text-center transition-colors duration-300 hover:bg-[#f5f5f5]"
          >
            <span className="text-base font-semibold text-[#634031]">Call Now</span>
          </a>
          
          {/* Divider */}
          <div className="w-px bg-[#e0c9c2] my-2"></div>
          
          {/* Book Now Button */}
          <button 
            onClick={handleOpenForm}
            className="flex-1 flex items-center justify-center py-4 px-2 text-center transition-colors duration-300 hover:bg-[#f5f5f5]"
          >
            <span className="text-base font-semibold text-[#634031]">Book Now</span>
          </button>
        </div>
      </div>

      <footer className="w-full text-white pb-16 md:pb-0" style={{ backgroundColor: '#65302f' }}>
        <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="py-8 sm:py-12 lg:py-12">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
              {/* Brand Column */}
              <div className="xs:col-span-2 sm:col-span-2 lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="max-w-lg"
                >
                  {/* ISMO Logo */}
                  <div className="mb-4">
                    <img 
                      src="/Logo-Final-White-01.png" 
                      alt="ISMO Skin & Aesthetics" 
                      className="h-16 w-auto max-w-[160px] sm:max-w-[180px] lg:max-w-[200px]"
                    />
                  </div>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed mb-6 sm:mb-8">
                    Chennai's premier dermatology-led hair clinic. Trusted by celebrities for advanced hair restoration treatments.
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <a 
                      href="tel:+91 80561 33033" 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity hover:text-white"
                    >
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      +91 80561 33033
                    </a>
                    <a 
                      href="mailto:info@ismoclinic.com" 
                      className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity hover:text-white"
                    >
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      info@ismoclinic.com
                    </a>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 sm:gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Link Columns */}
              {footerLinks.map((column, colIndex) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (colIndex + 1) }}
                  className="mt-4 sm:mt-0"
                >
                  <h4 className="font-semibold text-sm sm:text-base mb-4 sm:mb-6">{column.title}</h4>
                  <ul className="space-y-2 sm:space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-xs sm:text-sm opacity-80 hover:opacity-100 transition-opacity hover:text-white block py-1"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-4 sm:pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p className="text-xs sm:text-sm opacity-80 text-center sm:text-left">
                © {new Date().getFullYear()} ISMO Skin & Aesthetics. All rights reserved.
              </p>
              <p className="text-xs sm:text-sm opacity-80 text-center sm:text-right">
                Designed with care in Chennai
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;