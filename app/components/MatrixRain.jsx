import React, { useEffect, useRef } from "react";

export default function MatrixRain() 
{
  const canvasRef = useRef(null);

  useEffect(() => 
    {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const fontSize = 18;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);

        function draw() {
        ctx.fillStyle = "rgba(0,0,0,0.05)";
        ctx.fillRect(0, 0, width, height);

        ctx.font = fontSize + "px monospace";
        ctx.fillStyle = "#00ff41";
        for (let i = 0; i < drops.length; i++) {
            const text = String.fromCharCode(0x30A0 + Math.random() * 96);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let animation;
    function animate() 
    {
      draw();
      animation = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener("resize", () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.25 }}
    />
  );
}