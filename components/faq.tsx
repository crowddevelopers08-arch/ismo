import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ConsultationForm from './popupform';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Changed from 0 to null
  const [showForm, setShowForm] = useState(false); // State for showing form

  const faqs = [
    {
      question: 'How long does it take to see results from hair treatments?',
      answer: 'Most patients begin to notice visible improvements within 3-4 months of starting treatment. However, the timeline can vary based on individual factors and the specific treatment protocol. Our doctors will provide a realistic timeline during your consultation.',
    },
    {
      question: 'Are the treatments painful?',
      answer: 'Our treatments are designed to be comfortable. For procedures like Exosome Hair Boost and GFC, we use topical numbing to minimize any discomfort. Most patients describe the sensation as mild and very tolerable.',
    },
    {
      question: 'How many sessions will I need?',
      answer: 'The number of sessions depends on your specific condition and treatment plan. Typically, initial treatment protocols involve 4-6 sessions, followed by maintenance sessions. Your dermatologist will create a personalized schedule for you.',
    },
    {
      question: 'What makes ISMO different from other clinics?',
      answer: 'ISMO combines dermatologist expertise with cutting-edge technology in a premium, comfortable environment. Our personalized approach, transparent pricing, and celebrity-trusted results set us apart.',
    },
    {
      question: 'Is there any downtime after treatments?',
      answer: 'Most of our treatments require minimal to no downtime. You can typically resume your regular activities immediately after your session. Specific aftercare instructions will be provided based on your treatment.',
    },
    {
      question: 'Do you offer consultations before starting treatment?',
      answer: 'Absolutely! We always begin with a comprehensive consultation and scalp analysis. This helps us understand your concerns and create the most effective treatment plan for you.',
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

      <section className="w-full py-10 sm:py-10 md:py-10 lg:py-14 px-4 sm:px-6 max-[470px]:pt-2 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-10 md:mb-10 lg:mb-10 px-4"
          >
            {/* Decorative Element */}
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 sm:w-10 h-0.5 bg-gradient-to-r from-transparent via-[#65302f] to-transparent"></div>
              <span className="text-[#65302f] font-medium text-sm sm:text-base">FAQs</span>
              <div className="w-8 sm:w-10 h-0.5 bg-gradient-to-l from-transparent via-[#65302f] to-transparent"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="text-[#65302f] bg-clip-text">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#785546] max-w-2xl mx-auto leading-relaxed">
              Get answers to common questions about our treatments and services.
            </p>
          </motion.div>

          {/* FAQ Grid/Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - For larger screens */}
            <div className="lg:block space-y-4 sm:space-y-6">
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e0c9c2] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      {/* Number Indicator */}
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#fff7f1] to-[#e0c9c2] rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs sm:text-sm font-bold text-[#65302f]">
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Question */}
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-[#65302f] group-hover:text-[#785546] transition-colors duration-200 pr-2 text-left">
                        {faq.question}
                      </span>
                    </div>
                    
                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2 sm:ml-4"
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#785546] group-hover:text-[#65302f] transition-colors duration-200" />
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-11 sm:pl-14">
                          <div className="relative">
                            {/* Decorative line */}
                            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e0c9c2] via-[#785546] to-[#e0c9c2]"></div>
                            <p className="text-sm sm:text-base text-[#65302f]/80 leading-relaxed sm:leading-loose">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Right Column - For larger screens */}
            <div className="lg:block space-y-4 sm:space-y-6">
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
                const adjustedIndex = index + Math.ceil(faqs.length / 2);
                return (
                  <motion.div
                    key={adjustedIndex}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e0c9c2] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === adjustedIndex ? null : adjustedIndex)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left group"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1">
                        {/* Number Indicator */}
                        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#fff7f1] to-[#e0c9c2] rounded-full flex items-center justify-center shadow-sm">
                          <span className="text-xs sm:text-sm font-bold text-[#65302f]">
                            {adjustedIndex + 1}
                          </span>
                        </div>
                        
                        {/* Question */}
                        <span className="text-sm sm:text-base md:text-lg font-semibold text-[#65302f] group-hover:text-[#785546] transition-colors duration-200 pr-2 text-left">
                          {faq.question}
                        </span>
                      </div>
                      
                      {/* Chevron */}
                      <motion.span
                        animate={{ rotate: openIndex === adjustedIndex ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-2 sm:ml-4"
                      >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#785546] group-hover:text-[#65302f] transition-colors duration-200" />
                      </motion.span>
                    </button>
                    
                    <AnimatePresence>
                      {openIndex === adjustedIndex && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-11 sm:pl-14">
                            <div className="relative">
                              {/* Decorative line */}
                              <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e0c9c2] via-[#785546] to-[#e0c9c2]"></div>
                              <p className="text-sm sm:text-base text-[#65302f]/80 leading-relaxed sm:leading-loose">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Single Column - For small and medium screens */}
            <div className="lg:hidden space-y-4 sm:space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-[#e0c9c2] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-6 text-left group"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      {/* Number Indicator */}
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-[#fff7f1] to-[#e0c9c2] rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-xs sm:text-sm font-bold text-[#65302f]">
                          {index + 1}
                        </span>
                      </div>
                      
                      {/* Question */}
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-[#65302f] group-hover:text-[#785546] transition-colors duration-200 pr-2 text-left">
                        {faq.question}
                      </span>
                    </div>
                    
                    {/* Chevron */}
                    <motion.span
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-2 sm:ml-4"
                    >
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#785546] group-hover:text-[#65302f] transition-colors duration-200" />
                    </motion.span>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pl-11 sm:pl-14">
                          <div className="relative">
                            {/* Decorative line */}
                            <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#e0c9c2] via-[#785546] to-[#e0c9c2]"></div>
                            <p className="text-sm sm:text-base text-[#65302f]/80 leading-relaxed sm:leading-loose">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-10 sm:mt-10 md:mt-10 lg:mt-12"
          >
            <div className="max-w-2xl mx-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#fff7f1] to-[#f5e9e0] rounded-2xl sm:rounded-3xl shadow-lg border border-[#e0c9c2]">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#65302f] mb-3 sm:mb-4">
                Still have questions?
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#785546] mb-6 sm:mb-8">
                Our team is here to help you get all the information you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleOpenForm}
                  className="bg-gradient-to-r from-[#65302f] to-[#785546] hover:from-[#503225] hover:to-[#65302f] text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book Your Consultation
                </button>
                <a href="tel: +91 80561 33033">
                <button className="bg-white hover:bg-[#fff7f1] text-[#65302f] font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 border-[#e0c9c2] hover:border-[#785546] text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-md">
                  Call +91 80561 33033
                </button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;