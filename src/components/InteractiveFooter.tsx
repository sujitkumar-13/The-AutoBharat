import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function InteractiveFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!footerRef.current) return;
      const rect = footerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative h-80 overflow-hidden bg-card border-t border-border cursor-crosshair select-none"
    >
      {/* Spotlight reveal mask for AUTOBHARAT text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2
          className="text-display text-6xl sm:text-8xl md:text-9xl font-light tracking-[0.15em] text-foreground whitespace-nowrap"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.4s ease",
            WebkitMaskImage: isHovering
              ? `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)`
              : "none",
            maskImage: isHovering
              ? `radial-gradient(circle 180px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)`
              : "none",
          }}
        >
          AUTOBHARAT
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 flex items-end justify-between">
        <div>
          <div className="accent-line mb-3" />
          <p className="text-xs text-muted-foreground tracking-wider">
            © 2026 AUTOBHARAT. ALL RIGHTS RESERVED.
          </p>
        </div>
        <p className="text-xs text-muted-foreground tracking-wider hidden sm:block">
          THE AUTOMOTIVE EDITORIAL
        </p>
      </div>
    </footer>
  );
}
