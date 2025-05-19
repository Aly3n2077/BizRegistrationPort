type ProgressStepProps = {
  currentStep: number;
};

export default function ProgressSteps({ currentStep }: ProgressStepProps) {
  const steps = [
    { number: 1, title: "Company Details" },
    { number: 2, title: "Directors & Shareholders" },
    { number: 3, title: "Business Address" },
    { number: 4, title: "Document Upload" },
    { number: 5, title: "Review & Submit" },
  ];

  return (
    <div className="flex justify-between items-center mb-12 px-2">
      {steps.map((step) => (
        <div 
          key={step.number} 
          className={`step-indicator flex flex-col items-center ${
            step.number <= currentStep ? "active" : ""
          }`}
        >
          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-semibold ${
            step.number === currentStep 
              ? "bg-primary-600 text-white" 
              : step.number < currentStep 
                ? "bg-primary-600 text-white" 
                : "bg-gray-200 text-gray-600"
          }`}>
            {step.number}
          </div>
          <span className="text-sm mt-2 font-medium text-center">{step.title}</span>
        </div>
      ))}
    </div>
  );
}
