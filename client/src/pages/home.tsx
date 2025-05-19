import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/hero-section";
import FeaturesSection from "@/components/home/features-section";
import FaqSection from "@/components/home/faq-section";
import NameSearchForm from "@/components/name-search-form";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Zimbabwe Business Registration Portal - Official Online Service</title>
        <meta name="description" content="Streamlined online company registration for Zimbabwean businesses. Complete your registration quickly and easily with our official online portal." />
      </Helmet>
      
      <HeroSection />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-primary-900 text-center">Check Company Name Availability</h2>
            <p className="text-gray-600 mb-8 text-center">Verify if your desired company name is available before starting the registration process.</p>
            
            <div className="glassmorphism rounded-xl p-6 md:p-8 bg-primary-50">
              <NameSearchForm />
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection />
      <FaqSection />
    </>
  );
}
