import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const closeSheet = () => setIsOpen(false);
  
  return (
    <header className="bg-gradient-to-r from-primary-950 to-primary-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          {/* Zimbabwe national colors used in the crest - green, yellow, red, black */}
          <div className="relative mr-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center bg-gradient-to-b from-green-600 to-green-800 overflow-hidden shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Z"></path>
              </svg>
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-red-600"></div>
            </div>
          </div>
          <div>
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold font-roboto cursor-pointer text-shadow">
                Zimbabwe Business Registration Portal
              </h1>
            </Link>
            <p className="text-sm md:text-base text-yellow-300 font-medium">
              Official Online Registration Service
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-primary-300 transition">
            Home
          </Link>
          <Link href="/register" className="text-white hover:text-primary-300 transition">
            Register
          </Link>
          <Link href="/check-name" className="text-white hover:text-primary-300 transition">
            Name Check
          </Link>
          <Link href="/check-status" className="text-white hover:text-primary-300 transition">
            Track Status
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-white p-1">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-primary-950 text-white">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={closeSheet} className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                  Home
                </Link>
                <Link href="/register" onClick={closeSheet} className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                  Register
                </Link>
                <Link href="/check-name" onClick={closeSheet} className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                  Name Check
                </Link>
                <Link href="/check-status" onClick={closeSheet} className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                  Track Status
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
