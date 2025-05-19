import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      question: "What documents do I need to register a company?",
      answer: "To register a company in Zimbabwe, you'll need: completed CR1 form, company constitution/articles of association, copies of directors' IDs, proof of registered address, and payment of registration fees. All these can be uploaded through our platform."
    },
    {
      question: "How long does the registration process take?",
      answer: "The online registration process typically takes 7-10 business days from submission to certificate issuance, assuming all documents are in order. This is significantly faster than the traditional paper-based process."
    },
    {
      question: "What are the fees for company registration?",
      answer: "Registration fees vary based on company type and share capital. The current fee for a standard private limited company is USD 120, plus USD 20 for name reservation. All fees can be paid securely through our platform."
    },
    {
      question: "Can I save my application and continue later?",
      answer: "Yes, you can save your application at any point and continue later. The system will automatically save your progress as you complete each section, and you can log back in using your reference number to continue."
    },
    {
      question: "How do I receive my certificate of incorporation?",
      answer: "Once approved, you'll receive a digital copy of your certificate via email. The original certificate can be collected from our offices in Harare or Bulawayo, or delivered to your address for an additional fee."
    },
    {
      question: "What business types can be registered through this portal?",
      answer: "Our platform supports registration for Private Limited Companies (Pvt Ltd), Public Limited Companies (PLC), Partnerships, and Sole Proprietorships. Each business type has specific requirements detailed in the registration process."
    },
    {
      question: "Is there a way to expedite the registration process?",
      answer: "Yes, we offer priority processing for an additional fee of USD 100, which can reduce the processing time to 3-5 business days. This option can be selected during the payment stage of your application."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-accent-700">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to commonly asked questions about the business registration process in Zimbabwe.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-xl border border-gray-100">
            <Accordion type="single" collapsible className="space-y-5">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md data-[state=open]:shadow-md"
                >
                  <AccordionTrigger className="px-6 py-5 text-left bg-white hover:bg-primary-50/50 transition-all duration-300 font-medium text-primary-900 group">
                    <div className="flex items-center">
                      <div className="bg-primary-100 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-primary-700 group-data-[state=open]:bg-primary-700 group-data-[state=open]:text-white transition-all duration-300">
                        <ChevronRight className="h-4 w-4 group-data-[state=open]:rotate-90 transition-transform duration-300" />
                      </div>
                      {faq.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-5 pl-17 bg-white text-gray-600 border-t border-gray-100 leading-relaxed">
                    <div className="pl-11">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-700 text-white font-medium transition-all duration-300 hover:bg-primary-800 shadow-md hover:shadow-lg"
            >
              Contact Support
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
