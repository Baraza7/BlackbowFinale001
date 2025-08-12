import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Call2Action() {
    return (
        <section className="relative bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: "url('/hero-background.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl font-serif mb-6">
                    Ready to Start Your Next Project?
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10 font-sans">
                    Let's discuss how Blackbow Consult can provide the financial solutions you need to achieve your goals. Contact us today for a personalized consultation.
                </p>
                <div className="flex justify-center">
                    <a id="cta-link" href="/contacts" className="inline-block">
                        <Button
                            size="lg"
                            className="bg-[#FFBE00] text-black font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:bg-yellow-400 transition-transform transform hover:scale-105"
                            style={{
                                clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)',
                                borderRadius: '0',
                            }}
                        >
                            Contact Us Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Call2Action; 