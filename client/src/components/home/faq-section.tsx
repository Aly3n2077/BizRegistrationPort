import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  const faqs = [
    {
      question: "How long does the business registration process take?",
      answer: "Our streamlined online process typically takes 3-5 business days from submission to approval, compared to the traditional process which can take several weeks. Expedited processing options are available for urgent registrations."
    },
    {
      question: "What documents are required for business registration?",
      answer: "Required documents include proof of identity for all directors, proof of address, CR1 company registration form, and company constitution/articles. All documents can be uploaded digitally through our secure portal during the registration process."
    },
    {
      question: "How much does it cost to register a business?",
      answer: "Registration fees vary depending on your business type. Private Limited Companies start at $120, Public Companies at $200, and Sole Proprietorships at $50. All fees are payable online through our secure payment system."
    },
    {
      question: "Can I check if my business name is already taken?",
      answer: "Yes, you can use our free name search tool to instantly check if your desired business name is available. This should be your first step before beginning the registration process to avoid delays."
    },
    {
      question: "What types of businesses can I register through this portal?",
      answer: "Our portal supports registration for Private Limited Companies, Public Limited Companies, Partnerships, Business Names, and Sole Proprietorships in Zimbabwe."
    },
    {
      question: "How do I track my application status?",
      answer: "Once you submit your application, you'll receive a unique reference number. You can use this number in our 'Track Application' section to check real-time status updates throughout the approval process."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about registering your business in Zimbabwe.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                <AccordionTrigger className="px-6 py-4 text-left font-medium text-gray-900 hover:text-primary hover:bg-gray-50 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions about registering your business?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="#" 
                className="inline-flex items-center px-5 py-2.5 bg-white text-primary border border-gray-200 rounded-lg hover:shadow transition font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Visit Help Center
              </a>
              <a 
                href="#" 
                className="inline-flex items-center px-5 py-2.5 bg-white text-primary border border-gray-200 rounded-lg hover:shadow transition font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}