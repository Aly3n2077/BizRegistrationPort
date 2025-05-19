export default function FeaturesSection() {
  const features = [
    {
      icon: "bolt",
      title: "Fast Processing",
      description: "Complete your business registration in as little as 7-10 business days, significantly faster than traditional paper processes.",
      color: "from-primary-600 to-primary-800"
    },
    {
      icon: "shield-alt",
      title: "Secure & Confidential",
      description: "Your business information and documents are protected with enterprise-grade security and encryption technologies.",
      color: "from-accent-600 to-accent-800"
    },
    {
      icon: "check-circle",
      title: "Official Recognition",
      description: "Get a government-issued certificate of incorporation recognized by all agencies and financial institutions.",
      color: "from-primary-800 to-accent-700"
    },
    {
      icon: "laptop",
      title: "24/7 Access",
      description: "Submit your application and track its status anytime, anywhere, from any device with internet access.",
      color: "from-primary-700 to-primary-900"
    },
    {
      icon: "phone-alt",
      title: "Dedicated Support",
      description: "Get assistance from our dedicated support team throughout the registration process.",
      color: "from-accent-700 to-accent-900"
    },
    {
      icon: "dollar-sign",
      title: "Transparent Fees",
      description: "Clear pricing with no hidden costs. Pay official government fees directly through the platform.",
      color: "from-primary-600 to-accent-700"
    }
  ];

  // Function to render the appropriate icon based on the icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "bolt":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "shield-alt":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case "check-circle":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "laptop":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "phone-alt":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case "dollar-sign":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/70 to-white z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-accent-700">
            Why Choose Our Online Registration Platform
          </h2>
          <p className="text-lg text-gray-600">
            Our digital platform offers a streamlined process for business registration in Zimbabwe with powerful features and unmatched convenience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-xl relative overflow-hidden border border-gray-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full bg-primary-500 transition-all duration-300 group-hover:opacity-10"></div>
              
              <div className={`h-16 w-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg text-white rotate-3 transform transition-all duration-300 group-hover:rotate-0`}>
                <span>
                  {renderIcon(feature.icon)}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-primary-900 transition-all duration-300 group-hover:text-primary-700">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Bottom accent line that expands on hover */}
              <div className="absolute bottom-0 left-0 h-1 w-10 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 group-hover:w-full"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a href="/register" className="inline-flex items-center gap-2 text-primary-700 font-medium hover:text-primary-900 transition-colors">
            Learn more about our registration process
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
