import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section with Logo and Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <div className="relative mr-3 flex-shrink-0">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1" />
                    <path d="M14 16H9m-2-2v-1a1 1 0 0 1 1-1h7m-2 4v4" />
                    <path d="M3 8v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8H5a2 2 0 0 1-2-2v-1z" />
                    <path d="M5 10V6a2 2 0 0 1 2-2h7.5M15 9l3-3-3-3" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">Business Registration Portal</h2>
                <p className="text-sm text-gray-400">Streamlining business registration in Zimbabwe</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook" className="bg-gray-800 hover:bg-primary text-white p-2.5 rounded-full transition-colors duration-200">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="bg-gray-800 hover:bg-primary text-white p-2.5 rounded-full transition-colors duration-200">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="bg-gray-800 hover:bg-primary text-white p-2.5 rounded-full transition-colors duration-200">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube" className="bg-gray-800 hover:bg-primary text-white p-2.5 rounded-full transition-colors duration-200">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-gray-800 pb-2">About</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About the Portal</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Government Partners</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">News & Updates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Career Opportunities</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-gray-800 pb-2">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/register" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Company Registration
                </Link>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Business Licensing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Tax Registration</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Intellectual Property</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-gray-800 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Video Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Registration Requirements</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white border-b border-gray-800 pb-2">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Ministry of Industry and Commerce, New Government Complex, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a href="tel:+263242123456" className="text-gray-400 hover:text-white transition-colors duration-200">+263 (242) 123-456</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                <a href="mailto:support@bizregister.gov.zw" className="text-gray-400 hover:text-white transition-colors duration-200">support@bizregister.gov.zw</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section with Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Zimbabwe Business Registration Portal. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}