import { Helmet } from "react-helmet";

import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import FaqSection from "@/components/home/faq-section";
import NameSearchForm from "@/components/name-search-form";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Business Registration Portal - Zimbabwe</title>
        <meta 
          name="description" 
          content="Streamlined online company registration service for businesses in Zimbabwe. Register your business quickly, securely, and efficiently."
        />
      </Helmet>
    
      <main>
        <HeroSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Check Company Name Availability</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Verify if your desired company name is available before starting the registration process. 
                Our system will instantly check against the national business registry.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <NameSearchForm />
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <FaqSection />
      </main>
    </>
  );
}