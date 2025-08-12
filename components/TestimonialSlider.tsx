"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  location?: string;
  company?: string;
  image?: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ramadhan Wanje",
    location: "Nairobi",
    company: "Khadim Construction Limited",
    image: "/Ramadhan Wanje.png",
    quote:
      "Blackbow Consult Limited have always demonstrated, quick turn around time and flexibility in guarantee issuance, it’s always a pleasure working with them",
  },
  {
    name: "Richard Ochieng",
    location: "Eldoret",
    image: "/Richard Ochieng.png",
    quote:
      "Blackbow Consult Limited are the place to go for all our trade finance solutions , their end to end offering has assisted us immensely in our business",
  },
  {
    name: "Abdirizack Nur",
    company: "Padaa Enterprises Limited",
    image: "/Abdirizack Nur.png",
    quote:
      "The support we have gotten from Blackbow over the past few years has been very good, we feel well served on trade finance solutions",
  },
  {
    name: "Florence Taiwa",
    company: "Splash Limited",
    image: "/Florence Taiwa.png",
    quote:
      "Service has been nothing short of amazing from blackbow, we appreciate the prompt service",
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardsToShow = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? testimonials.length - cardsToShow : prevIndex - 1;
      return Math.max(0, Math.min(newIndex, testimonials.length - cardsToShow));
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex > testimonials.length - cardsToShow ? 0 : newIndex;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getVisibleTestimonials = () => {
    const visibleCards = [];
    for (let i = 0; i < cardsToShow; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visibleCards.push(testimonials[index]);
    }
    return visibleCards;
  };

  return (
    <section 
      className="py-16 md:py-24 relative overflow-hidden bg-white"
    >
      {/* Frosted glass overlay */}
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          style={{ color: '#FFBE00' }}
        >
          What Our Clients Say
        </h2>
        <div className="text-center mb-12">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            You don't just have to take our word for it—hear what our clients have to say about working with Blackbow Consult. From startups to industry leaders, their experiences reflect our commitment to excellence, trust, and Africa's financial growth. Discover their stories below.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl h-full flex flex-col border border-gray-200 min-h-[260px]"
              >
                <div className="flex items-center mb-4">
                  <div className="relative mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400">
                      <img 
                        src={testimonial.image || '/placeholder-user.jpg'} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{testimonial.name}</h4>
                    {(() => {
                      const subtitle = [testimonial.location, testimonial.company]
                        .filter(Boolean)
                        .join(" • ");
                      return subtitle ? (
                        <p
                          className="text-sm"
                          style={{ color: 'var(--accent-yellow)' }}
                        >
                          {subtitle}
                        </p>
                      ) : null;
                    })()}
                  </div>
                  <div className="ml-auto bg-yellow-400 rounded-full p-2">
                    <Quote className="w-4 h-4 text-blue-900" />
                  </div>
                </div>
                
                <p className="text-md italic flex-grow text-gray-700">
                  {`"${testimonial.quote}"`}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={handlePrev}
              className="bg-yellow-400 text-blue-900 rounded-full p-3 hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2 items-center">
              {Array.from({ length: testimonials.length - cardsToShow + 1 }).map((_, index) => (
                <button 
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-yellow-400 w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={handleNext}
              className="bg-yellow-400 text-blue-900 rounded-full p-3 hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider; 