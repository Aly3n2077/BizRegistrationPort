import { Link } from "wouter";
import { 
  Github, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Youtube 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" 
                alt="Zimbabwe Coat of Arms" 
                className="h-10 mr-3"
              />
              <div>
                <h2 className="text-xl font-bold">Zimbabwe Business Registration Portal</h2>
                <p className="text-sm text-primary-200">Streamlining business registration nationwide</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6 md:mb-0">
            <div className="flex space-x-4">
              <a href="#" className="text-primary-200 hover:text-white transition">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-primary-200 hover:text-white transition">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>
        
        <hr className="border-primary-800 my-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-200 hover:text-white transition">About the Portal</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Government Partners</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">News & Updates</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Career Opportunities</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register" className="text-primary-200 hover:text-white transition">
                  Company Registration
                </Link>
              </li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Business Licensing</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Tax Registration</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Intellectual Property</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-200 hover:text-white transition">Help Center</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Video Tutorials</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">FAQs</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Registration Requirements</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-200 hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Accessibility</a></li>
              <li><a href="#" className="text-primary-200 hover:text-white transition">Company Act 2019</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Zimbabwe Business Registration Portal. All rights reserved.
          </p>
          <p className="text-sm text-primary-300">
            A service of the Ministry of Industry and Commerce, Republic of Zimbabwe
          </p>
        </div>
      </div>
    </footer>
  );
}
