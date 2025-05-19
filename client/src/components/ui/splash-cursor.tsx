import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashCursorProps {
  children: React.ReactNode;
  color?: string;
  size?: number;
  duration?: number;
  opacity?: number;
  disabled?: boolean;
}

export function SplashCursor({
  children,
  color = "hsl(var(--primary))",
  size = 100,
  duration = 0.6,
  opacity = 0.25,
  disabled = false,
}: SplashCursorProps) {
  const [positions, setPositions] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [lastId, setLastId] = useState(0);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const id = lastId + 1;
    setLastId(id);
    
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPositions((prev) => [...prev, { x, y, id }]);
    
    // Remove the splash after animation completes
    setTimeout(() => {
      setPositions((prev) => prev.filter((pos) => pos.id !== id));
    }, duration * 1000);
  };

  return (
    <div
      className="relative overflow-hidden"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={handleClick}
    >
      <AnimatePresence>
        {positions.map(({ x, y, id }) => (
          <motion.div
            key={id}
            initial={{ scale: 0, opacity }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            style={{
              position: "absolute",
              top: y - size / 2,
              left: x - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: color,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        ))}
      </AnimatePresence>
      {children}
    </div>
  );
}