import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')",
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          opacity: 0.15
        }}
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-950">
            Register Your Business Online
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Streamlined registration process for businesses across Zimbabwe - complete your company registration quickly, securely, and efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700">
              <Link href="/register">
                Start Registration
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-primary-800 border-primary-200">
              <Link href="/check-status">
                Check Application Status
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glassmorphism rounded-xl p-6 text-center">
            <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary-700 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary-900">Easy Registration</h3>
            <p className="text-gray-600">Simple step-by-step process following Zimbabwe's business regulations.</p>
          </div>
          
          <div className="glassmorphism rounded-xl p-6 text-center">
            <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary-700 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary-900">Document Upload</h3>
            <p className="text-gray-600">Securely upload all required documentation through our portal.</p>
          </div>
          
          <div className="glassmorphism rounded-xl p-6 text-center">
            <div className="bg-primary-100 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-primary-700 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary-900">Name Availability</h3>
            <p className="text-gray-600">Check if your desired company name is available before registering.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
