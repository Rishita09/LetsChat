import { useEffect, useRef } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let stars = [];
    const starCount = 80;

    // 🎨 Get secondary color from DaisyUI theme
    const secondaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--s") // DaisyUI's secondary color variable
      .trim();

    const initCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = secondaryColor;
        ctx.fill();
      });

      // Draw connecting lines (20% opacity of secondary color)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = secondaryColor.includes("#")
              ? hexToRGBA(secondaryColor, 0.2)
              : secondaryColor;
            ctx.stroke();
          }
        }
      }

      // Move stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
      });

      requestAnimationFrame(draw);
    };

    // Helper to convert hex to rgba
    const hexToRGBA = (hex, alpha) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    initCanvas();
    draw();
    window.addEventListener("resize", initCanvas);

    return () => window.removeEventListener("resize", initCanvas);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-base-200">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8">
        <h2 className="text-4xl font-bold text-base-content mb-4">{title}</h2>
        <p className="text-base-content/70 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
