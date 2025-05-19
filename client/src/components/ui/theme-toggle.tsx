import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { SplashCursor } from "./splash-cursor";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show theme toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Animation variants
  const iconVariants = {
    initial: { scale: 0.8, rotate: 0 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: { duration: 0.2 }
    },
    exit: { scale: 0.8, rotate: -90, opacity: 0 },
    hover: { scale: 1.1 }
  };

  const getIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <SplashCursor>
      <button
        onClick={() => {
          setTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark");
        }}
        className="relative inline-flex items-center justify-center rounded-full p-2 bg-white/10 backdrop-blur-md hover:bg-white/20 dark:bg-gray-900/50 dark:hover:bg-gray-800/70 shadow-sm transition-colors"
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          className={`
            ${theme === "light" ? "text-amber-500" : ""} 
            ${theme === "dark" ? "text-sky-400" : ""}
            ${theme === "system" ? "text-gray-500" : ""}
          `}
        >
          {getIcon()}
        </motion.div>
      </button>
    </SplashCursor>
  );
}