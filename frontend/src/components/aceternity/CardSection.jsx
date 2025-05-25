"use client";
import React, { useRef, useEffect } from "react";
import image from '../../assets/Images/websiteherosection.png'

const CardSection = () => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  // Mouse move inside card: tilt + glow follow
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!card || !glow) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Tilt
    const rotateX = -(y - height / 2) / 15;
    const rotateY = (x - width / 2) / 15;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move glow inside the card
    glow.style.display = "block";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  };

  // On mouse leave: reset tilt and hide glow
  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    if (glow) {
      glow.style.display = "none";
    }
  };

  // Create glow dot on mount
  useEffect(() => {
    const glow = document.createElement("div");
    glow.className = "glow-dot";
    glow.style.display = "none"; // Start hidden
    document.body.appendChild(glow);
    glowRef.current = glow;

    return () => {
      document.body.removeChild(glow);
    };
  }, []);

  return (
    <>
      <style>{`
        .glow-dot {
          pointer-events: none;
          position: fixed;
          width: 350px;
          height: 350px;
          background: radial-gradient(
            circle at center,
            rgba(59, 130, 246, 0.85) 0%,
            rgba(59, 130, 246, 0.5) 30%,
            rgba(59, 130, 246, 0.2) 60%,
            transparent 80%
          );
          filter: blur(50px);
          border-radius: 50%;
          mix-blend-mode: screen;
          transform: translate(-50%, -50%);
          z-index: 50;
          transition: left 0.04s ease-out, top 0.04s ease-out;
        }

        .tilt-card {
          transform-style: preserve-3d;
          transition: transform 0.2s ease;
        }
      `}</style>

      <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="tilt-card group bg-[#0f172a] rounded-3xl shadow-xl p-8 max-w-xl w-full border-2 border-transparent transition-all duration-300 ease-in-out group-hover:border-[#a855f7]/70 group-hover:shadow-[0_0_20px_#a855f7]/40"
          style={{ perspective: "1000px" }}
        >
          <div className="flex flex-col gap-y-8 items-start">
            <div className="flex flex-col gap-y-3">
              <p className="font-semibold text-lg text-[#7b8fd9]">Demo</p>
              <p className="text-white font-semibold text-3xl leading-snug">
                Explore Innovative Projects with SkillShiksha
              </p>
              <p className="text-base text-[#b0b0b0] font-medium">
                "From interactive web applications to cutting-edge software solutions,
                SkillShiksha is the space where ideas flourish and collaborations thrive."
              </p>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-base px-4 py-2 rounded-md transition">
              Try it Yourself
            </button>

            <div className="pt-4 self-center">
              <img
                alt="SkillShiksha"
                loading="lazy"
                width="300"
                height="300"
                decoding="async"
                className="rounded-xl object-cover"
                src={image}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardSection;
