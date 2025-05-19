import { Link } from "wouter";
import { 
  Twitter, 
  Facebook, 
  Linkedin, 
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative pt-20 pb-10 bg-gradient-to-b from-primary-800 to-primary-900 dark:from-gray-900 dark:to-gray-950 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden opacity-10">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-r from-primary-500 to-accent-500 blur-3xl absolute -top-[600px] -left-[200px]"></div>
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent-500 to-primary-500 blur-3xl absolute -top-[400px] -right-[300px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg shadow-lg mr-3">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5741/5741335.png" 
                  alt="Zimbabwe Coat of Arms" 
                  className="h-7 w-7"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white dark:text-white">Zimbabwe Business</h2>
                <p className="text-sm text-primary-200 dark:text-blue-200 -mt-1">Registration Portal</p>
              </div>
            </div>
            
            <p className="text-primary-200 dark:text-gray-300 mb-6 max-w-md">
              The official online platform for registering businesses in Zimbabwe. Our mission is to streamline 
              the registration process and promote economic growth through digital transformation.
            </p>
            
            <div className="space-y-3">
              <a href="mailto:info@zbregister.gov.zw" className="flex items-center text-primary-200 dark:text-gray-300 hover:text-white transition group">
                <Mail className="h-4 w-4 mr-3 text-primary-400 dark:text-blue-300 group-hover:text-primary-300" />
                <span>info@zbregister.gov.zw</span>
              </a>
              <a href="tel:+2631234567890" className="flex items-center text-primary-200 dark:text-gray-300 hover:text-white transition group">
                <Phone className="h-4 w-4 mr-3 text-primary-400 dark:text-blue-300 group-hover:text-primary-300" />
                <span>+263 (123) 456-7890</span>
              </a>
              <a href="#" className="flex items-center text-primary-200 dark:text-gray-300 hover:text-white transition group">
                <MapPin className="h-4 w-4 mr-3 text-primary-400 dark:text-blue-300 group-hover:text-primary-300" />
                <span>7th Floor, Causeway Building, Central Avenue, Harare</span>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-white dark:text-white border-b border-primary-700 dark:border-gray-700 pb-2">About</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  About the Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Government Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  News & Updates
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Career Opportunities
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-white dark:text-white border-b border-primary-700 dark:border-gray-700 pb-2">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/register" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Company Registration
                </Link>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Business Licensing
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Tax Registration
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Intellectual Property
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-white dark:text-white border-b border-primary-700 dark:border-gray-700 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Video Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-200 hover:text-white transition-colors flex items-center group">
                  <ChevronRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                  Registration Requirements
                </a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 text-white dark:text-white border-b border-primary-700 dark:border-gray-700 pb-2">Connect</h3>
            <div className="grid grid-cols-3 gap-2">
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Facebook className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Twitter className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Instagram className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Linkedin className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Youtube className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">YouTube</span>
              </a>
              <a href="#" className="bg-primary-800/50 hover:bg-primary-700 p-2 rounded-lg flex items-center justify-center transition-colors group">
                <Mail className="h-5 w-5 text-primary-300 group-hover:text-white" />
                <span className="sr-only">Email</span>
              </a>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3 text-primary-100">Subscribe to Updates</h4>
              <a 
                href="#" 
                className="bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-md flex items-center justify-center text-sm font-medium shadow-md shadow-primary-900/30 transition-all hover:shadow-lg"
              >
                Subscribe to Newsletter
                <ArrowUpRight className="h-3.5 w-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-primary-800">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <p className="text-sm text-primary-300">
              &copy; {currentYear} Zimbabwe Business Registration Portal. All rights reserved.
            </p>
            <div className="md:ml-8 mt-2 md:mt-0 flex space-x-6">
              <a href="#" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-primary-400 hover:text-primary-200 transition-colors">Accessibility</a>
            </div>
          </div>
          
          <div className="flex items-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/330/330669.png" 
              alt="Zimbabwe Flag" 
              className="h-5 w-5 mr-2" 
            />
            <p className="text-xs text-primary-300">
              A service of the Ministry of Industry and Commerce, Republic of Zimbabwe
            </p>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.a
        href="#top"
        className="fixed bottom-6 right-6 h-10 w-10 bg-primary-700 hover:bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg z-50 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
      </motion.a>
    </footer>
  );
}
