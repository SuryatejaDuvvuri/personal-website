'use client';
import React, { useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    weight: ['900'], 
    display: 'swap',
});

function Code() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');

        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        const letters = 'アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂヅテデトドナニヌネノハバパヒビピフブプヘベペホボポ'.split('');
        const letterSize = 14; 
        const cols = Math.floor(canvas.width / letterSize);
        const drops = Array(cols).fill(1);

        const phrases = [
            "Hello!",
            "I am Suryateja Duvvuri",
            "a Student",
            "a Developer",
            "Building something cool...",
        ];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingPause = false;
        let lastTyped = Date.now();

        function getTypeDelay() {
            if (isDeleting) return 75 + Math.random() * 50; 
            return 150 + Math.random() * 100; 
        }

        const textHeight = 40; 
        ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 
        const clearY = canvas.height / 2 - textHeight;
        ctx.fillRect(0, clearY, canvas.width, textHeight * 2);

        function draw() {

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${letterSize}px font-matrix`;

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                
                if (Math.random() > 0.98) {
                    ctx.fillStyle = '#fff'; 
                } else if (Math.random() > 0.90) {
                    ctx.fillStyle = '#0f0'; 
                } else {
                    ctx.fillStyle = '#040'; 
                }

                ctx.fillText(text, i * letterSize, drops[i] * letterSize);

                if (drops[i] * letterSize > canvas.height && Math.random() > 0.98) {
                    drops[i] = 0;
                }

                drops[i] += Math.random() * 0.5 + 0.5;
            }

            const now = Date.now();
            const currentText = phrases[currentPhrase];
            const typed = currentText.substring(0, currentChar);

            ctx.font = `900 40px Sekaiwo, monospace`;
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.imageSmoothingEnabled = false;
            ctx.textRendering = 'geometricPrecision';

            const textMetrics = ctx.measureText(typed);
            const textX = Math.round(canvas.width / 2);
            const textY = Math.round(canvas.height / 2);

            ctx.fillText(typed, textX, textY);

            if (Math.floor(now / 530) % 2) {
                const textWidth = ctx.measureText(typed).width;
                const cursorX = Math.round(canvas.width / 2 + textWidth / 2 + 2);
                const cursorY = Math.round(canvas.height / 2 - 14);
                ctx.fillRect(cursorX, cursorY, 2, 28);
            }

            if (!typingPause && now - lastTyped > getTypeDelay()) {
                    if (!isDeleting) {
                        if (currentChar < currentText.length) {
                            currentChar++;
                        } else {
                            typingPause = true;
                            setTimeout(() => {
                                isDeleting = true;
                                typingPause = false;
                            }, 2000);
                        }
                    } else {
                        if (currentChar > 0) {
                            currentChar--;
                        } else {
                            isDeleting = false;
                            currentPhrase = (currentPhrase + 1) % phrases.length;
                            typingPause = true;
                            setTimeout(() => { typingPause = false; }, 500);
                        }
                    }
                    lastTyped = now;
            }
        };

        
        
        
        const handleResize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };
        


        window.addEventListener('resize', handleResize);

        const interval = setInterval(draw, 33); 

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={ref} className="w-full h-full bg-black" />;
}

export default Code;