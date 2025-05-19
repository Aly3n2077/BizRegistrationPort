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
    <header className="bg-primary-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative mr-3 flex-shrink-0">
            <div className="w-12 h-12 rounded flex items-center justify-center bg-white overflow-hidden shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1" />
                <path d="M14 16H9m-2-2v-1a1 1 0 0 1 1-1h7m-2 4v4" />
                <path d="M3 8v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8H5a2 2 0 0 1-2-2v-1z" />
                <path d="M5 10V6a2 2 0 0 1 2-2h7.5M15 9l3-3-3-3" />
              </svg>
            </div>
          </div>
          <div>
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold font-roboto cursor-pointer">
                Business Registration Portal
              </h1>
            </Link>
            <p className="text-sm md:text-base text-blue-200 font-medium">
              Online Registration Service
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
