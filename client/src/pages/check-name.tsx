import { useState } from "react";
import { Helmet } from "react-helmet";
import NameSearchForm from "@/components/name-search-form";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function CheckName() {
  const [searchResult, setSearchResult] = useState<{
    companyName: string;
    entityType: string;
    isAvailable: boolean;
  } | null>(null);
  
  const handleSearchResult = (result: any) => {
    setSearchResult(result);
  };

  return (
    <>
      <Helmet>
        <title>Company Name Availability - Zimbabwe Business Registration Portal</title>
        <meta name="description" content="Check if your desired company name is available for registration in Zimbabwe. Verify name availability before starting your business registration process." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-primary-900 text-center">Check Company Name Availability</h1>
            <p className="text-gray-600 mb-8 text-center">Verify if your desired company name is available before starting the registration process.</p>
            
            <div className="rounded-xl p-6 md:p-8 bg-white border border-gray-200 shadow-md">
              <NameSearchForm onSearchResult={handleSearchResult} />
              
              {searchResult && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  {searchResult.isAvailable ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">Name Available</h4>
                        <p className="text-green-700">
                          The company name "{searchResult.companyName}" is available for registration.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                      <div className="bg-red-100 rounded-full p-1 mr-3 flex-shrink-0">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800">Name Not Available</h4>
                        <p className="text-red-700">
                          Unfortunately, the company name "{searchResult.companyName}" is already registered or reserved.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <p className="text-gray-700 mb-4">
                      {searchResult.isAvailable 
                        ? "This name is available for registration. Would you like to proceed with business registration?" 
                        : "Please consider an alternative name for your business registration."}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {searchResult.isAvailable && (
                        <Button asChild>
                          <Link href="/register" className="bg-primary-600 hover:bg-primary-700 text-white">
                            Proceed to Registration
                          </Link>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchResult(null)}
                      >
                        Search Another Name
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
