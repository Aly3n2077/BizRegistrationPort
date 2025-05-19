import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { motion } from "framer-motion";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { GradientButton } from "@/components/ui/gradient-button";
import { ArrowRight, FileText, Upload, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Interactive background */}
      <BackgroundPaths 
        className="absolute inset-0 z-0" 
        color="hsl(var(--primary) / 0.2)" 
        density={24} 
        opacity={0.3}
      />
      
      {/* Gradient color orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Primary orb */}
        <div className="absolute top-1/4 -left-[20%] w-[60%] h-[60%] rounded-full bg-primary/15 animate-float blur-3xl" />
        {/* Accent orb */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 animate-float-delayed blur-3xl" />
        {/* Secondary orb */}
        <div className="absolute top-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-secondary/10 animate-float-slow blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-8 rounded-full bg-primary/10 text-primary-600 font-medium text-sm backdrop-blur-sm border border-primary/20">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-500 animate-pulse mr-2"></span>
            Official Government Approved Registration Portal
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent leading-tight tracking-tight">
            Register Your Business
            <br /> 
            <span className="relative inline-block">
              <span>Online</span>
              <motion.span 
                className="absolute -bottom-1 left-0 h-2 bg-accent/40 w-full rounded-md"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </span>
          </h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Streamlined registration process for businesses across Zimbabwe - complete your company registration quickly, securely, and efficiently.
          </motion.p>
          
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/register">
              <GradientButton 
                variant="primary" 
                size="xl" 
                className="font-semibold"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                Start Registration
              </GradientButton>
            </Link>
            
            <Link href="/check-status">
              <GradientButton 
                variant="outline" 
                size="xl" 
                className="font-semibold backdrop-blur-md"
              >
                Check Application Status
              </GradientButton>
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, staggerChildren: 0.1 }}
        >
          {[
            {
              title: "Easy Registration",
              description: "Simple step-by-step process following Zimbabwe's business regulations with real-time guidance.",
              icon: <FileText className="h-8 w-8" />,
              gradient: "from-blue-500 to-blue-600",
              delay: 0.1
            },
            {
              title: "Document Upload",
              description: "Securely upload all required documentation through our encrypted portal system.",
              icon: <Upload className="h-8 w-8" />,
              gradient: "from-purple-500 to-purple-600",
              delay: 0.2
            },
            {
              title: "Name Availability",
              description: "Check if your desired company name is available in the national business registry before registering.",
              icon: <Search className="h-8 w-8" />,
              gradient: "from-teal-500 to-teal-600",
              delay: 0.3
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="glass-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl border border-primary-100/50 dark:border-gray-700/50 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: feature.delay, duration: 0.6 }}
            >
              {/* Animated gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl opacity-10 rounded-bl-[100px]" />
              
              {/* Feature icon */}
              <div className={`bg-gradient-to-br ${feature.gradient} h-16 w-16 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg transform transition-transform duration-500 group-hover:rotate-6 text-white`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-primary-900 dark:text-primary-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              
              {/* Bottom animated accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary/50 to-accent/50 transition-all duration-700" />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-50 text-primary-800 font-medium text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
            Over 10,000 businesses successfully registered in 2023
          </span>
        </motion.div>
      </div>
    </section>
  );
}
