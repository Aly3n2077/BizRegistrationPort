import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import AnimatedFaqSection from "@/components/home/animated-faq";
import NameSearchForm from "@/components/name-search-form";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Zimbabwe Business Registration Portal - Official Online Service</title>
        <meta name="description" content="Streamlined online company registration for Zimbabwean businesses. Complete your registration quickly and easily with our official online portal." />
        <meta property="og:title" content="Zimbabwe Business Registration Portal" />
        <meta property="og:description" content="Register your business quickly and securely with our official online portal. Our streamlined process makes company registration simple and efficient." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://business.gov.zw" />
      </Helmet>
      
      <HeroSection />
      
      <section className="py-20 relative overflow-hidden">
        <BackgroundPaths 
          className="absolute inset-0 z-0 opacity-10" 
          color="hsl(var(--secondary) / 0.3)" 
          density={10}
          opacity={0.3} 
          speed={5}
        />
        
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-40 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl z-0"></div>
        <div className="absolute -bottom-10 right-0 w-80 h-80 bg-secondary/5 rounded-full filter blur-3xl z-0"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 mb-4 rounded-full bg-secondary/10 text-secondary-700 font-medium text-sm backdrop-blur-sm border border-secondary/20">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse mr-2"></span>
                Business Name Search
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Check Company Name Availability
              </h2>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Verify if your desired company name is available before starting the registration process.
              </p>
            </div>
            
            <motion.div 
              className="glass-card bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <NameSearchForm />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <FeaturesSection />
      <AnimatedFaqSection />
      
      {/* Added stats section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <BackgroundPaths 
            color="white" 
            density={15} 
            opacity={0.4}
            speed={3}
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Thousands of Businesses
            </h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Join the growing number of businesses that have used our platform to establish their presence in Zimbabwe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Registered Companies" },
              { number: "98%", label: "Success Rate" },
              { number: "7-10", label: "Days Average Processing" },
              { number: "24/7", label: "Online Availability" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-primary-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
