import { motion } from "framer-motion";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { Zap, Shield, CheckCircle, Laptop, Phone, DollarSign, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Zap className="h-7 w-7" />,
      title: "Fast Processing",
      description: "Complete your business registration in as little as 7-10 business days, significantly faster than traditional paper processes.",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-primary-200",
      delay: 0.1
    },
    {
      icon: <Shield className="h-7 w-7" />,
      title: "Secure & Confidential",
      description: "Your business information and documents are protected with enterprise-grade security and encryption technologies.",
      color: "from-purple-500 to-purple-600",
      borderColor: "border-secondary-200",
      delay: 0.2
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      title: "Official Recognition",
      description: "Get a government-issued certificate of incorporation recognized by all agencies and financial institutions.",
      color: "from-teal-500 to-teal-600",
      borderColor: "border-accent-200",
      delay: 0.3
    },
    {
      icon: <Laptop className="h-7 w-7" />,
      title: "24/7 Access",
      description: "Submit your application and track its status anytime, anywhere, from any device with internet access.",
      color: "from-indigo-500 to-indigo-600",
      borderColor: "border-primary-200",
      delay: 0.4
    },
    {
      icon: <Phone className="h-7 w-7" />,
      title: "Dedicated Support",
      description: "Get assistance from our dedicated support team throughout the registration process.",
      color: "from-cyan-500 to-cyan-600",
      borderColor: "border-secondary-200",
      delay: 0.5
    },
    {
      icon: <DollarSign className="h-7 w-7" />,
      title: "Transparent Fees",
      description: "Clear pricing with no hidden costs. Pay official government fees directly through the platform.",
      color: "from-amber-500 to-amber-600",
      borderColor: "border-accent-200",
      delay: 0.6
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <BackgroundPaths 
        className="absolute inset-0 z-0 opacity-25" 
        density={15} 
        color="hsl(var(--secondary) / 0.1)"
        speed={3}
      />
      
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/3 -right-[10%] w-[35%] h-[35%] rounded-full bg-accent/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-secondary/10 text-secondary-700 font-medium text-sm backdrop-blur-sm border border-secondary/20">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse mr-2"></span>
            Premium Registration Services
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            Why Choose Our Online Registration Platform
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our digital platform offers a streamlined process for business registration in Zimbabwe with powerful features and unmatched convenience.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <SplashCursor key={index}>
              <motion.div 
                variants={itemVariants}
                className={`bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden border ${feature.borderColor} dark:border-gray-700 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group`}
              >
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Decorative corner shape */}
                <div className="absolute -top-10 -right-10 w-20 h-20 transform rotate-45 bg-gradient-to-br from-primary/10 to-accent/10" />
                
                {/* Feature icon with gradient background */}
                <div className={`h-16 w-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg transform transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-primary-900 dark:text-primary-100 transition-all duration-300 group-hover:translate-x-1">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Animated border line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary/50 via-secondary/50 to-accent/50 transition-all duration-700" />
              </motion.div>
            </SplashCursor>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 transform">
            Start Your Business Registration
            <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
          
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            No credit card required to start the process
          </p>
        </motion.div>
      </div>
    </section>
  );
}
