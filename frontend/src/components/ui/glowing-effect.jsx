import { memo, useEffect, useRef } from "react";
import { animate } from "framer-motion";

const GlowingEffect = memo((props) => {
  const {
    blur = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  } = props;

  const containerRef = useRef(null);

  useEffect(() => {
    if (disabled || !containerRef.current) return;

    const element = containerRef.current;

    // Continuous rotation animation
    const rotate = () => {
      animate(0, 360, {
        duration: movementDuration,
        repeat: Infinity,
        ease: "linear",
        onUpdate: (value) => {
          element.style.setProperty("--start", String(value));
        },
      });
    };

    rotate();

    return () => {
      // Cleanup animation if needed
    };
  }, [disabled, movementDuration]);

  return (
    <>
      <div
        className={`pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity ${glow ? "opacity-100" : ""} ${variant === "white" ? "border-white" : ""} ${disabled ? "!block" : ""}`}
      />
      <div
        ref={containerRef}
        style={{
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "1", // Always active
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient":
            variant === "white"
              ? `repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              rgba(255, 255, 255, 0.9),
              rgba(255, 255, 255, 0.9) calc(25% / var(--repeating-conic-gradient-times))
            )`
              : `radial-gradient(circle, rgba(221, 123, 187, 0.9) 10%, rgba(221, 123, 187, 0.5) 20%),
            radial-gradient(circle at 40% 40%, rgba(215, 159, 30, 0.9) 5%, rgba(215, 159, 30, 0.5) 15%),
            radial-gradient(circle at 60% 60%, rgba(90, 146, 44, 0.9) 10%, rgba(90, 146, 44, 0.5) 20%), 
            radial-gradient(circle at 40% 60%, rgba(76, 120, 148, 0.9) 10%, rgba(76, 120, 148, 0.5) 20%),
            repeating-conic-gradient(
              from 236.84deg at 50% 50%,
              rgba(221, 123, 187, 0.9) 0%,
              rgba(215, 159, 30, 0.9) calc(25% / var(--repeating-conic-gradient-times)),
              rgba(90, 146, 44, 0.9) calc(50% / var(--repeating-conic-gradient-times)), 
              rgba(76, 120, 148, 0.9) calc(75% / var(--repeating-conic-gradient-times)),
              rgba(221, 123, 187, 0.9) calc(100% / var(--repeating-conic-gradient-times))
            )`,
        }}
        className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity ${glow ? "opacity-100" : ""} ${blur > 0 ? "blur-[var(--blur)]" : ""} ${className} ${disabled ? "!hidden" : ""}`}
      >
        <div
          className={`glow rounded-[inherit] after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:[border:var(--glowingeffect-border-width)_solid_transparent] after:[background:var(--gradient)] after:[background-attachment:fixed] after:opacity-[var(--active)] after:transition-opacity after:duration-300 after:[mask-clip:padding-box,border-box] after:[mask-composite:intersect] after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]`}
        />
      </div>
    </>
  );
});

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };