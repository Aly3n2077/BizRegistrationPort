import React from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Users, 
  FileText, 
  Shield, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Building, 
  HelpCircle,
  Calendar,
  CreditCard,
  Mail,
  Save,
  Download
} from "lucide-react";

const iconVariants = {
  initial: { scale: 0.8, opacity: 0.5 },
  hover: { 
    scale: 1.1, 
    opacity: 1,
    transition: { 
      duration: 0.3,
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.9,
    transition: { 
      duration: 0.1
    }
  }
};

const containerVariants = {
  initial: { 
    scale: 1,
    rotate: 0
  },
  hover: { 
    scale: 1.05,
    rotate: 3,
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const glowVariants = {
  initial: {
    opacity: 0
  },
  hover: {
    opacity: 0.7,
    transition: {
      duration: 0.4
    }
  }
};

type AnimatedIconProps = {
  icon: string;
  size?: number;
  color?: string;
  withContainer?: boolean;
  className?: string;
};

export function AnimatedIcon({ 
  icon, 
  size = 24, 
  color = "currentColor",
  withContainer = true,
  className = ""
}: AnimatedIconProps) {
  const getIcon = () => {
    switch (icon) {
      case "zap":
        return <Zap size={size} className={className} />;
      case "users":
        return <Users size={size} className={className} />;
      case "file-text":
        return <FileText size={size} className={className} />;
      case "shield":
        return <Shield size={size} className={className} />;
      case "check-circle":
        return <CheckCircle size={size} className={className} />;
      case "clock":
        return <Clock size={size} className={className} />;
      case "dollar-sign":
        return <DollarSign size={size} className={className} />;
      case "building":
        return <Building size={size} className={className} />;
      case "help-circle":
        return <HelpCircle size={size} className={className} />;
      case "calendar":
        return <Calendar size={size} className={className} />;
      case "credit-card":
        return <CreditCard size={size} className={className} />;
      case "mail":
        return <Mail size={size} className={className} />;
      case "save":
        return <Save size={size} className={className} />;
      case "download":
        return <Download size={size} className={className} />;
      default:
        return <HelpCircle size={size} className={className} />;
    }
  };

  if (!withContainer) {
    return (
      <motion.div
        variants={iconVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        style={{ color }}
      >
        {getIcon()}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-current rounded-full blur-md z-0"
        variants={glowVariants}
        style={{ color }}
      />
      
      {/* Icon container */}
      <motion.div
        className="relative z-10 flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary-700/90 p-3 rounded-xl shadow-lg"
        style={{ color: "white" }}
      >
        {getIcon()}
      </motion.div>
    </motion.div>
  );
}