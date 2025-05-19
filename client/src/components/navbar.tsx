import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, Home, FileText, Search, Activity, User, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ui/theme-toggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  const closeSheet = () => setIsOpen(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    { href: "/register", label: "Register", icon: <FileText className="h-4 w-4" /> },
    { href: "/check-name", label: "Name Check", icon: <Search className="h-4 w-4" /> },
    { href: "/check-status", label: "Track Status", icon: <Activity className="h-4 w-4" /> }
  ];
  
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md text-primary-950 shadow-lg border-b border-gray-100' 
          : 'bg-transparent text-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center mr-6">
              <div className="w-10 h-10 mr-2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-lg">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5741/5741335.png" 
                  alt="Zimbabwe Coat of Arms" 
                  className="h-6 w-6"
                />
              </div>
              <Link href="/" className="flex flex-col">
                <span className={`text-lg md:text-xl font-bold tracking-tight ${
                  scrolled ? 'text-primary-900' : 'text-white'
                }`}>
                  Zimbabwe Business
                </span>
                <span className={`text-xs font-medium -mt-1 ${
                  scrolled ? 'text-primary-600' : 'text-primary-200'
                }`}>
                  Registration Portal
                </span>
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg flex items-center font-medium text-sm transition-all duration-200 group ${
                    isActive 
                      ? scrolled 
                        ? 'bg-primary-100 text-primary-900' 
                        : 'bg-white/20 text-white' 
                      : scrolled 
                        ? 'hover:bg-primary-50 text-gray-700 hover:text-primary-900' 
                        : 'hover:bg-white/10 text-white/90 hover:text-white'
                  }`}
                >
                  <span className="mr-1.5">{link.icon}</span>
                  {link.label}
                  {isActive && (
                    <motion.span 
                      className={`absolute bottom-0 left-0 h-0.5 w-full ${
                        scrolled ? 'bg-primary-600' : 'bg-white'
                      }`}
                      layoutId="navbar-underline"
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="ml-4 flex items-center gap-2">
              <div className={scrolled ? "text-primary-900" : "text-white"}>
                <ThemeToggle />
              </div>
              <Button 
                variant={scrolled ? "default" : "outline"}
                className={scrolled 
                  ? "bg-primary-600 text-white hover:bg-primary-700 ml-2" 
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/30 ml-2"
                }
              >
                <User className="h-4 w-4 mr-1.5" />
                Login
              </Button>
            </div>
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className={`p-1 ${scrolled ? 'text-primary-900' : 'text-white'}`}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white text-primary-950">
                <div className="flex items-center mb-8 mt-4">
                  <div className="w-10 h-10 mr-2 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-lg">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/5741/5741335.png" 
                      alt="Zimbabwe Coat of Arms" 
                      className="h-6 w-6"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Zimbabwe Business</h3>
                    <p className="text-xs text-primary-600">Registration Portal</p>
                  </div>
                </div>
                
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive = location === link.href;
                    return (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        onClick={closeSheet} 
                        className={`flex items-center p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-primary-100 text-primary-900 font-medium' 
                            : 'hover:bg-gray-100 text-gray-800'
                        }`}
                      >
                        <span className={`mr-3 p-1 rounded-md ${isActive ? 'bg-primary-200 text-primary-900' : 'bg-gray-100'}`}>
                          {link.icon}
                        </span>
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white">
                    <User className="h-4 w-4 mr-2" />
                    Login to Account
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
