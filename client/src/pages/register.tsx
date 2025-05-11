import { useState } from "react";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

import ProgressSteps from "@/components/company-form/progress-steps";
import { FormProvider } from "@/components/company-form/form-context";
import Step1CompanyDetails from "@/components/company-form/step1-company-details";
import Step2Directors from "@/components/company-form/step2-directors";
import Step3Address from "@/components/company-form/step3-address";
import Step4Documents from "@/components/company-form/step4-documents";
import Step5Review from "@/components/company-form/step5-review";

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  const registerMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await apiRequest('POST', '/api/registrations', formData);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful",
        description: `Your application has been submitted successfully. Your reference number is ${data.referenceNumber}`,
        variant: "default",
      });
      
      // Redirect to status page with the reference number
      navigate(`/check-status?reference=${data.referenceNumber}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred while submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  });

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (formData: FormData) => {
    registerMutation.mutate(formData);
  };

  return (
    <>
      <Helmet>
        <title>Register Your Business - Zimbabwe Business Registration Portal</title>
        <meta name="description" content="Complete your business registration application using our step-by-step online form. Register your company in Zimbabwe quickly and easily." />
      </Helmet>
      
      <section id="registration-form" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-primary-900 text-center">Company Registration Form</h1>
            <p className="text-gray-600 mb-12 text-center">Complete the following steps to register your business in Zimbabwe.</p>
            
            <ProgressSteps currentStep={currentStep} />
            
            <div className="glassmorphism rounded-xl p-6 md:p-8 bg-white">
              <FormProvider onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <Step1CompanyDetails onNext={nextStep} />
                )}
                
                {currentStep === 2 && (
                  <Step2Directors onNext={nextStep} onPrev={prevStep} />
                )}
                
                {currentStep === 3 && (
                  <Step3Address onNext={nextStep} onPrev={prevStep} />
                )}
                
                {currentStep === 4 && (
                  <Step4Documents onNext={nextStep} onPrev={prevStep} />
                )}
                
                {currentStep === 5 && (
                  <Step5Review 
                    onPrev={prevStep} 
                    isSubmitting={registerMutation.isPending} 
                  />
                )}
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
