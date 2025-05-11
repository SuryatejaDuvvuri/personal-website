'use client';
import React, { useEffect, useState } from 'react';
import Code from "./Code"
import Computer from "./Computer"
import dynamic from 'next/dynamic';
import FilmRoll from "./FilmRoll"

const Sunrise = dynamic(() => import('./Sunrise'), {
    ssr: false,
    loading: () => <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
    </div>
});

function Entry() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollProgress = window.scrollY / window.innerHeight;
            setScrolled(scrollProgress > 0.1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="relative w-full">
            <div className="fixed inset-0 z-0">
                <Sunrise />
            </div>

            <section className="relative min-h-[200vh]">
                <div 
                    className="sticky top-0 h-screen w-full overflow-hidden"
                    style={{
                        transform: scrolled ? 'translate3d(0, 15vh, 500px) scale(0.6)' : 'none',
                        opacity: scrolled ? 0 : 1,
                        transition: 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s ease-in-out',
                        transformOrigin: 'center center',
                    }}
                >
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <Computer />
                        <div className="absolute w-[700px] h-[310px] bottom-[130px] left-[600px] overflow-hidden">
                            <Code />
                        </div>
                    </div>
                </div>
                    
                <div 
                    className="relative z-20 min-h-screen flex items-center justify-center"
                    style={{
                        opacity: scrolled ? 1 : 0,
                        transform: scrolled ? 'scale(1)' : 'scale(0.9)',
                        transition: 'opacity 1s ease-in-out, transform 1s cubic-bezier(0.23, 1, 0.32, 1)',
                    }}
                >
                    <FilmRoll />
                    <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            About me
                        </h2>

                    </div>
                </div>

                <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Experience
                        </h2>

                    </div>
                </div>

                 <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Projects
                        </h2>

                    </div>
                </div>

                 <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Skills
                        </h2>

                    </div>
                </div>

                <div className="min-h-screen flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-8xl font-black tracking-tighter mb-12">
                            Contact
                        </h2>
               
                    </div>
                </div>

                    
                </div>
            </section>
        </main>
    );
}

export default Entry;