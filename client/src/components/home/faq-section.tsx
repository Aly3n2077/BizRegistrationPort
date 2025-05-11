import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-primary-900 text-center">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left bg-white hover:bg-gray-50 transition font-medium text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
