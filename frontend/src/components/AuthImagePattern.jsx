// // const AuthImagePattern = ({ title, subtitle }) => {
// //   return (
// //     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
// //       <div className="max-w-md text-center">
// //         {/* Diagonal Wave Pattern */}
// //         <div className="grid grid-cols-5 gap-4 mb-8">
// //           {[...Array(15)].map((_, i) => (
// //             <div
// //               key={i}
// //               className={`
// //                 w-6 h-6 rounded-full
// //                 ${i % 2 === 0 ? "bg-primary/70" : "bg-secondary/70"}
// //                 animate-pulse
// //               `}
// //               style={{
// //                 animationDelay: `${i * 0.15}s`,
// //                 animationDuration: "1.5s",
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Title & Subtitle */}
// //         <h2 className="text-2xl font-bold mb-4">{title}</h2>
// //         <p className="text-base-content/60">{subtitle}</p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AuthImagePattern;
// const AuthImagePattern = ({ title, subtitle }) => {
//   return (
//     <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
//       <div className="max-w-md text-center">
//         {/* Animated Honeycomb Pattern */}
//         <div className="relative w-64 h-64 mx-auto mb-8 animate-spin-slow">
//           {[...Array(7)].map((_, i) => {
//             const angle = (i * 60 * Math.PI) / 180; // distribute around circle
//             const radius = 70; // distance from center
//             const x = Math.cos(angle) * radius + 128; // center is 128px (half of 256)
//             const y = Math.sin(angle) * radius + 128;

//             return (
//               <div
//                 key={i}
//                 className="absolute w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-80 animate-pulse"
//                 style={{
//                   left: `${x - 40}px`,
//                   top: `${y - 40}px`,
//                   transform: `rotate(${i * 15}deg) scale(${1 + (i % 2) * 0.2})`,
//                   animationDelay: `${i * 0.3}s`,
//                 }}
//               />
//             );
//           })}

//           {/* Center hexagon */}
//           <div className="absolute w-24 h-24 rounded-xl bg-primary/90 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
//         </div>

//         {/* Title & Subtitle */}
//         <h2 className="text-3xl font-bold mb-4">{title}</h2>
//         <p className="text-base-content/60">{subtitle}</p>
//       </div>
//     </div>
//   );
// };

// export default AuthImagePattern;

import { useEffect, useRef } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let stars = [];
    const starCount = 80;

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
        ctx.fillStyle = "#a78bfa"; // Tailwind purple-400
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = "rgba(167, 139, 250, 0.2)";
            ctx.stroke();
          }
        }
      }

      // Move stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Bounce on edges
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;
      });

      requestAnimationFrame(draw);
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
        <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white/70 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
