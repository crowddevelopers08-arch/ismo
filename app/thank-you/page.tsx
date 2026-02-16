"use client";
import ThankNavbar from '@/components/thanknavbar';
import Link from 'next/link';
import Script from 'next/script';

export default function ThankYou() {
  return (
    <>
      <ThankNavbar />
      
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            gtag('event', 'conversion', {'send_to': 'AW-16722442662/tQCWCN_li7kbEKbz8KU-'});
          `
        }}
      />
      
      <div className="min-h-screen bg-white text-gray-800 pt-16">
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Success Icon */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 rounded-full bg-[#fff7f1] border-4 border-[#e0c9c2] flex items-center justify-center mx-auto mb-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-[#785546]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-[#634031] mb-4">
              Thank You for Choosing ISMO Clinic!
            </h1>
            
            <p className="text-lg text-[#785546] mb-8">
              Our hair specialist will contact you shortly to confirm your consultation.
            </p>
          </div>

          {/* Contact Info Box */}
          <div className="bg-[#fff7f1] rounded-xl p-6 md:p-8 border border-[#e0c9c2] mb-10">
            <h2 className="text-xl font-bold text-[#634031] mb-4">
              For immediate assistance:
            </h2>
            <div className="space-y-4">
              <div>
                <a 
                  href="tel:+91 80561 33033" 
                  className="text-2xl md:text-3xl font-bold text-[#785546] hover:text-[#634031] transition-colors block"
                >
                  +91 80561 33033
                </a>
                <p className="text-[#785546] text-sm mt-1">
                  Call or WhatsApp for quick responses
                </p>
              </div>
              
              <div>
                <p className="font-medium text-[#634031]">Email</p>
                <p className="text-[#785546]">info@ismoclinics.com</p>
              </div>
              
              <div>
                <p className="font-medium text-[#634031]">Clinic Address</p>
                <p className="text-[#785546] text-sm">
                  No. 24, GS Tower, Abhiramapuram 4th Street,<br />
                  RA Puram, Chennai, India
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#634031] mb-6 text-center">
              What's Next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#785546] text-white flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-[#634031]">Confirmation Call</p>
                  <p className="text-[#785546] text-sm">We'll call to confirm your appointment slot</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#785546] text-white flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-[#634031]">Detailed Consultation</p>
                  <p className="text-[#785546] text-sm">Comprehensive assessment with our specialist</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-[#785546] text-white flex items-center justify-center font-bold mr-4 mt-1 flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-[#634031]">Personalized Treatment Plan</p>
                  <p className="text-[#785546] text-sm">Customized solution for your hair concerns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link 
              href="/" 
              className="bg-[#785546] hover:bg-[#634031] text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center shadow-sm"
            >
              Return to Homepage
            </Link>
            <a 
              href="tel:+91-80561 33033" 
              className="border-2 border-[#785546] text-[#785546] hover:bg-[#fff7f1] font-semibold py-3 px-8 rounded-lg transition-colors text-center"
            >
              Call Now
            </a>
          </div>

          {/* Clinic Hours */}
          <div className="text-center border-t border-[#e0c9c2] pt-6">
            <p className="text-[#785546]">
              <strong>Clinic Hours:</strong> Mon-Sat: 10:00 AM - 7:00 PM | Sunday: Closed
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-[#e0c9c2] py-6 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#634031] font-medium">
              © 2026 ISMO Clinic | Skin & Aesthetics, Chennai
            </p>
            <p className="text-[#785546] text-sm mt-2">
              Advanced hair treatments: QR 678, GFC, PRP, Laser Therapies
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}