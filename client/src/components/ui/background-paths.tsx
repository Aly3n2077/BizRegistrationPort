import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BackgroundPathsProps {
  className?: string;
  density?: number;
  opacity?: number;
  color?: string;
  speed?: number;
}

export function BackgroundPaths({
  className,
  density = 30,
  opacity = 0.15,
  color = "#4f46e5", // indigo color
  speed = 2.5,
}: BackgroundPathsProps) {
  const [paths, setPaths] = useState<Array<{ id: number; path: string; delay: number }>>([]);

  useEffect(() => {
    const generateRandomPath = (id: number) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const path = [];
      
      path.push(`M ${startX} ${startY}`);
      
      // Generate random control points for curves
      const numCurves = 2 + Math.floor(Math.random() * 3); // 2-4 curves
      
      for (let i = 0; i < numCurves; i++) {
        const endX = startX + (Math.random() * 20 - 10); // Move -10 to +10 from start
        const endY = startY + (Math.random() * 20 - 5); // Move -5 to +15 from start (slight downward bias)
        
        const cp1x = startX + (Math.random() * 10 - 5);
        const cp1y = startY + (Math.random() * 10 - 5);
        const cp2x = endX + (Math.random() * 10 - 5);
        const cp2y = endY + (Math.random() * 10 - 5);
        
        path.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
      }
      
      return {
        id,
        path: path.join(" "),
        delay: Math.random() * 5, // Random delay for animation
      };
    };
    
    const newPaths = Array.from({ length: density }).map((_, index) =>
      generateRandomPath(index)
    );
    
    setPaths(newPaths);
  }, [density]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      <svg
        className="w-full h-full absolute top-0 left-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map(({ id, path, delay }) => (
          <motion.path
            key={id}
            d={path}
            fill="none"
            stroke={color}
            strokeWidth="1"
            initial={{ strokeOpacity: 0, pathLength: 0 }}
            animate={{ 
              strokeOpacity: opacity, 
              pathLength: 1 
            }}
            transition={{
              duration: speed,
              delay: delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: Math.random() * 2
            }}
          />
        ))}
      </svg>
    </div>
  );
}