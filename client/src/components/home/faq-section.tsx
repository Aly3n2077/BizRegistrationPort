import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight, Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SplashCursor } from "@/components/ui/simple-splash-cursor";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function FaqSection() {
  const faqs = [
    {
      question: "What documents do I need to register a company?",
      answer: "To register a company in Zimbabwe, you'll need: completed CR1 form, company constitution/articles of association, copies of directors' IDs, proof of registered address, and payment of registration fees. All these can be uploaded through our platform.",
      category: "Documents"
    },
    {
      question: "How long does the registration process take?",
      answer: "The online registration process typically takes 7-10 business days from submission to certificate issuance, assuming all documents are in order. This is significantly faster than the traditional paper-based process.",
      category: "Timeline"
    },
    {
      question: "What are the fees for company registration?",
      answer: "Registration fees vary based on company type and share capital. The current fee for a standard private limited company is USD 120, plus USD 20 for name reservation. All fees can be paid securely through our platform.",
      category: "Fees"
    },
    {
      question: "Can I save my application and continue later?",
      answer: "Yes, you can save your application at any point and continue later. The system will automatically save your progress as you complete each section, and you can log back in using your reference number to continue.",
      category: "Process"
    },
    {
      question: "How do I receive my certificate of incorporation?",
      answer: "Once approved, you'll receive a digital copy of your certificate via email. The original certificate can be collected from our offices in Harare or Bulawayo, or delivered to your address for an additional fee.",
      category: "Certificates"
    },
    {
      question: "What business types can be registered through this portal?",
      answer: "Our platform supports registration for Private Limited Companies (Pvt Ltd), Public Limited Companies (PLC), Partnerships, and Sole Proprietorships. Each business type has specific requirements detailed in the registration process.",
      category: "Business Types"
    },
    {
      question: "Is there a way to expedite the registration process?",
      answer: "Yes, we offer priority processing for an additional fee of USD 100, which can reduce the processing time to 3-5 business days. This option can be selected during the payment stage of your application.",
      category: "Timeline"
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Animated background paths */}
      <BackgroundPaths 
        className="absolute inset-0 z-0" 
        color="hsl(var(--accent) / 0.07)" 
        density={12}
        opacity={0.5}
        speed={4}
      />
      
      {/* Gradient orbs */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-20 -left-32 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-accent/10 text-accent-700 font-medium text-sm backdrop-blur-sm border border-accent/20">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse mr-2"></span>
              Have Questions? We've Got Answers
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary via-accent to-primary leading-tight">
              Frequently Asked Questions
            </h2>
            
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Find answers to commonly asked questions about the business registration process in Zimbabwe.
            </p>
          </div>
          
          <motion.div 
            className="rounded-3xl p-4 md:p-8 relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Glass card background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 z-0"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-tr-full"></div>
            
            <Accordion type="single" collapsible className="space-y-5 relative z-10">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="border border-gray-100 rounded-xl overflow-hidden bg-white/80 shadow-sm transition-all duration-300 hover:shadow-md data-[state=open]:shadow-lg data-[state=open]:border-primary-200"
                  >
                    <AccordionTrigger className="px-6 py-5 text-left hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 font-medium text-gray-800 group">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 w-10 h-10 rounded-xl flex items-center justify-center mr-4 text-white shadow-lg shadow-primary/20 transform transition-all duration-300 group-data-[state=open]:rotate-6">
                          <ChevronRight className="h-5 w-5 transform transition-transform duration-500 group-data-[state=open]:rotate-90" strokeWidth={2} />
                        </div>
                        <div>
                          <span className="block text-primary-900 font-semibold">{faq.question}</span>
                          <span className="text-xs text-accent-600 font-medium">{faq.category}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="px-6 py-5 bg-gradient-to-r from-primary/5 via-transparent to-transparent text-gray-600 border-t border-gray-100 leading-relaxed">
                      <div className="ml-14">
                        <p className="relative">
                          {/* Left accent border */}
                          <span className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full"></span>
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-gray-700 mb-6 font-medium">Still have questions?</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <SplashCursor color="hsla(var(--primary) / 0.2)">
                <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 cursor-pointer">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                  <span>Call Us</span>
                </div>
              </SplashCursor>
              
              <SplashCursor color="hsla(var(--secondary) / 0.2)">
                <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-secondary-600 to-secondary-700 text-white font-medium shadow-lg shadow-secondary/20 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 cursor-pointer">
                  <Mail className="h-5 w-5" strokeWidth={2} />
                  <span>Email Support</span>
                </div>
              </SplashCursor>
              
              <SplashCursor color="hsla(var(--accent) / 0.2)">
                <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 text-white font-medium shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 cursor-pointer">
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                  <span>Live Chat</span>
                </div>
              </SplashCursor>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              Our support team is available Monday to Friday, 8:00 AM - 5:00 PM
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
