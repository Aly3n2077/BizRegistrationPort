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
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative mr-3 flex-shrink-0">
            <div className="w-12 h-12 rounded-md flex items-center justify-center bg-primary overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1" />
                <path d="M14 16H9m-2-2v-1a1 1 0 0 1 1-1h7m-2 4v4" />
                <path d="M3 8v11a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8H5a2 2 0 0 1-2-2v-1z" />
                <path d="M5 10V6a2 2 0 0 1 2-2h7.5M15 9l3-3-3-3" />
              </svg>
            </div>
          </div>
          <div>
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold cursor-pointer text-gray-900">
                Business Registration
              </h1>
            </Link>
            <p className="text-sm text-primary">
              Zimbabwe Registration Portal
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </Link>
          <Link href="/register" className="text-gray-700 hover:text-primary font-medium">
            Register
          </Link>
          <Link href="/check-name" className="text-gray-700 hover:text-primary font-medium">
            Name Check
          </Link>
          <Link href="/check-status" className="text-gray-700 hover:text-primary font-medium">
            Track Status
          </Link>
          <Link href="/register">
            <Button>
              Start Now
            </Button>
          </Link>
        </nav>
        
        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" onClick={closeSheet} className="text-gray-700 hover:text-primary py-2">
                  Home
                </Link>
                <Link href="/register" onClick={closeSheet} className="text-gray-700 hover:text-primary py-2">
                  Register
                </Link>
                <Link href="/check-name" onClick={closeSheet} className="text-gray-700 hover:text-primary py-2">
                  Name Check
                </Link>
                <Link href="/check-status" onClick={closeSheet} className="text-gray-700 hover:text-primary py-2">
                  Track Status
                </Link>
                <Link href="/register" onClick={closeSheet}>
                  <Button className="w-full mt-4">
                    Start Registration
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}