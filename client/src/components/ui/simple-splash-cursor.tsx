import { ReactNode, useState, useRef, useEffect } from 'react';

interface SplashCursorProps {
  children: ReactNode;
  color?: string;
}

export function SplashCursor({ children, color = "hsla(var(--primary) / 0.2)" }: SplashCursorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move to create splash effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !rippleRef.current) return;
    
    const container = containerRef.current;
    const ripple = rippleRef.current;
    
    // Get position relative to container
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create ripple effect
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.opacity = '0.5';
    ripple.style.transform = 'scale(0.1)';
    
    // Animate ripple
    ripple.animate(
      [
        { transform: 'scale(0.1)', opacity: '0.5' },
        { transform: 'scale(1.5)', opacity: '0' }
      ], 
      {
        duration: 800,
        easing: 'ease-out'
      }
    );
  };
  
  // Handle mouse enter to show splash effect
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  // Handle mouse leave to hide splash effect
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rippleRef.current) {
      rippleRef.current.style.opacity = '0';
    }
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Splash effect */}
      <div 
        ref={rippleRef}
        className="absolute rounded-full pointer-events-none z-0 transition-transform"
        style={{ 
          width: '200px', 
          height: '200px', 
          left: '50%',
          top: '50%',
          marginLeft: '-100px',
          marginTop: '-100px',
          background: color,
          opacity: 0,
          filter: 'blur(10px)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default SplashCursor;