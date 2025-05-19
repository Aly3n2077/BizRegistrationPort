import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Hero Background with gradient */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-primary-900/30 via-accent-600/20 to-primary-800/30"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-accent-700">
            Register Your Business Online
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Streamlined registration process for businesses across Zimbabwe - complete your company registration quickly, securely, and efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-6 px-8 rounded-lg shadow-lg shadow-primary-600/30 transition-all duration-300 transform hover:scale-105">
              <Link href="/register">
                Start Registration
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/80 backdrop-blur-sm hover:bg-white text-primary-800 border-primary-300 py-6 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <Link href="/check-status">
                Check Application Status
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl shadow-primary-900/5 border border-primary-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/10">
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary-900">Easy Registration</h3>
            <p className="text-gray-600">Simple step-by-step process following Zimbabwe's business regulations with real-time guidance.</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl shadow-primary-900/5 border border-primary-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/10">
            <div className="bg-gradient-to-br from-accent-600 to-accent-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-600/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary-900">Document Upload</h3>
            <p className="text-gray-600">Securely upload all required documentation through our encrypted portal system.</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-xl shadow-primary-900/5 border border-primary-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-900/10">
            <div className="bg-gradient-to-br from-primary-800 to-accent-700 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary-800/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-primary-900">Name Availability</h3>
            <p className="text-gray-600">Check if your desired company name is available in the national business registry before registering.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
