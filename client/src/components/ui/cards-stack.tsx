import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardsStackProps {
  cards: {
    id: string | number;
    content: React.ReactNode;
  }[];
  className?: string;
  cardClassName?: string;
  direction?: "horizontal" | "vertical";
  gap?: number;
  offset?: number;
  infinite?: boolean;
  autoplay?: boolean;
  interval?: number;
}

export function CardsStack({
  cards,
  className,
  cardClassName,
  direction = "horizontal",
  gap = 10,
  offset = 20,
  infinite = true,
  autoplay = false,
  interval = 3000,
}: CardsStackProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  React.useEffect(() => {
    if (!autoplay || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) =>
        infinite || prev < cards.length - 1 ? (prev + 1) % cards.length : prev
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, isPaused, cards, infinite, interval]);

  const handleNext = () => {
    setActiveIndex((prev) =>
      infinite || prev < cards.length - 1 ? (prev + 1) % cards.length : prev
    );
  };

  const handlePrev = () => {
    setActiveIndex((prev) =>
      infinite || prev > 0 ? (prev - 1 + cards.length) % cards.length : prev
    );
  };

  const maxVisibleCards = Math.min(cards.length, 3);

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            // Calculate distance from active card
            let distance = index - activeIndex;
            if (infinite) {
              // For infinite scroll, find the smallest absolute distance
              if (distance > cards.length / 2) distance -= cards.length;
              if (distance < -cards.length / 2) distance += cards.length;
            }

            // Only render cards that are within the visible range
            const isVisible = infinite
              ? Math.abs(distance) < maxVisibleCards
              : index >= activeIndex - maxVisibleCards + 1 &&
                index <= activeIndex + maxVisibleCards - 1;

            if (!isVisible) return null;

            const zIndex = 10 - Math.abs(distance);
            const styleProps = {
              zIndex,
              position: "absolute" as const,
              top: 0,
              left: 0,
              right: 0,
              opacity: 1 - Math.abs(distance) * 0.2,
              pointerEvents: distance === 0 ? "auto" as const : "none" as const,
            };

            let transform = "";

            if (direction === "horizontal") {
              transform = `translateX(${distance * offset}px) scale(${
                1 - Math.abs(distance) * 0.05
              })`;
            } else {
              transform = `translateY(${distance * offset}px) scale(${
                1 - Math.abs(distance) * 0.05
              })`;
            }

            return (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, transform }}
                animate={{
                  opacity: styleProps.opacity,
                  transform,
                  zIndex: styleProps.zIndex,
                }}
                exit={{ opacity: 0, transform }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={styleProps}
                className={cn(
                  "w-full transition-all",
                  distance === 0 ? "cursor-default" : "cursor-pointer",
                  cardClassName
                )}
                onClick={() => {
                  if (distance !== 0) {
                    setActiveIndex(index);
                  }
                }}
              >
                {card.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 z-20 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span className="sr-only">Previous</span>
      </button>

      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 z-20 shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
        <span className="sr-only">Next</span>
      </button>

      <div className="flex justify-center mt-4 gap-1.5">
        {cards.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === activeIndex
                ? "bg-primary-500 w-4"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}