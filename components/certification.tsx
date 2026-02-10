'use client'
import React, { useState } from "react";
export default function RealPatientResultsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Real patient video URLs (replace with actual video URLs)
  const videos = [
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-happy-woman-in-salon-17086-large.mp4",
      title: "Patient Review 1",
      description: "Hair treatment results after 3 months"
    },
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-woman-with-beautiful-curly-hair-3442-large.mp4",
      title: "Patient Review 2",
      description: "Skin treatment transformation"
    },
    {
      src: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-smiling-while-getting-a-haircut-17117-large.mp4",
      title: "Patient Review 3",
      description: "Complete hair restoration journey"
    }
  ];
 
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
  };
 
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
  };
 
  // Arrow Icon Component
  const ArrowIcon = ({ direction }: { direction: 'left' | 'right' }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: direction === 'left' ? 'rotate(180deg)' : 'none'
      }}
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
 
  // Video Player Component
  const VideoPlayer = ({ video, index }: { video: typeof videos[0], index: number }) => (
    <div className="overflow-hidden rounded-xl bg-black">
      <div className="relative w-full">
        {/* Video Player - Instagram-style aspect ratio (4:5 or 9:16) */}
        <video
          src={video.src}
          className="w-full h-[500px] object-cover"
          controls
          preload="metadata"
          poster=""
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Simple Video Title Overlay */}
        {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white">
            <h3 className="text-lg font-bold">{video.title}</h3>
            <p className="text-sm text-gray-300">{video.description}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
 
  return (
    <section className="w-full" style={{ backgroundColor: "#65302f" }}>
      <div className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-center text-2xl md:text-4xl font-extrabold tracking-tight text-white max-[470px]:mb-6 mb-10">
          Real Patient, Real Results
        </p>
 
        {/* Desktop Grid View */}
        <div className="desktop-view mt-10 grid gap-8 md:grid-cols-3">
          {videos.map((video, i) => (
            <VideoPlayer key={i} video={video} index={i} />
          ))}
        </div>
 
        {/* Mobile Carousel View */}
        <div className="mobile-view mt-10" style={{ display: 'none' }}>
          {/* Carousel with Side Arrows */}
          <div className="relative flex items-center justify-center max-[470px]:gap-0 gap-4">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-300 hover:bg-white hover:text-[#65302f] z-10"
              aria-label="Previous video"
            >
              <ArrowIcon direction="left" />
            </button>
 
            {/* Video Container */}
            <div className="flex-1 overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {videos.map((video, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <VideoPlayer video={video} index={i} />
                  </div>
                ))}
              </div>
            </div>
 
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/30 bg-white/10 text-white transition-all duration-300 hover:bg-white hover:text-[#65302f] z-10"
              aria-label="Next video"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
 
          {/* Dots Indicator Below */}
          <div className="mt-6 flex justify-center gap-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="transition-all duration-300"
                style={{
                  width: currentSlide === index ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '5px',
                  backgroundColor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
 
      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-view {
            display: none !important;
          }
          .mobile-view {
            display: block !important;
          }
        }
        
        /* Instagram-style video styling */
        video {
          background: #000;
          min-height: 500px;
        }
        
        /* Responsive height adjustments */
        @media (min-width: 768px) {
          video {
            height: 600px;
          }
        }
        
        @media (min-width: 1024px) {
          video {
            height: 700px;
          }
        }
        
        /* For very small screens */
        @media (max-width: 480px) {
          video {
            height: 400px;
          }
        }
        
        /* Custom video controls styling */
        video::-webkit-media-controls-panel {
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
        }
        
        video::-webkit-media-controls-play-button {
          background-color: #65302f;
          border-radius: 50%;
        }
        
        /* Better mobile video controls */
        video {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </section>
  );
}