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
    <header className="bg-primary-950 text-white py-4">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50&q=80" 
            alt="Zimbabwe Coat of Arms" 
            className="h-12 mr-3"
          />
          <div>
            <Link href="/">
              <h1 className="text-xl md:text-2xl font-bold font-roboto cursor-pointer">
                Zimbabwe Business Registration Portal
              </h1>
            </Link>
            <p className="text-sm md:text-base text-primary-200">
              Official Online Registration Service
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="text-white hover:text-primary-300 transition">Home</a>
          </Link>
          <Link href="/register">
            <a className="text-white hover:text-primary-300 transition">Register</a>
          </Link>
          <Link href="/check-name">
            <a className="text-white hover:text-primary-300 transition">Name Check</a>
          </Link>
          <Link href="/check-status">
            <a className="text-white hover:text-primary-300 transition">Track Status</a>
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
                <Link href="/" onClick={closeSheet}>
                  <a className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                    Home
                  </a>
                </Link>
                <Link href="/register" onClick={closeSheet}>
                  <a className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                    Register
                  </a>
                </Link>
                <Link href="/check-name" onClick={closeSheet}>
                  <a className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                    Name Check
                  </a>
                </Link>
                <Link href="/check-status" onClick={closeSheet}>
                  <a className="text-white hover:text-primary-300 transition p-2 rounded hover:bg-primary-900">
                    Track Status
                  </a>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
